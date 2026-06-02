import Anthropic from '@anthropic-ai/sdk'

// Cached system prompt — stays warm across invocations in the same session
const SYSTEM = `You are a precise data-extraction assistant specialised in AlerTox ELISA
Certificate of Analysis (COA) documents used in food-safety allergen testing.
Extract structured data from a COA and return only valid JSON — no markdown fences,
no explanation, no surrounding text.`

const PROMPT = `Extract these seven fields from the attached COA document and return them
as a JSON object with exactly these keys:

{
  "product":       "Full product name including kit size, e.g. AlerTox ELISA Histamine (96 tests)",
  "catalogNo":     "Catalog / kit number starting with KIT followed by four digits, e.g. KIT3065",
  "lot":           "Lot or batch number — typically six digits, e.g. 307626",
  "expiryDate":    "Expiry date formatted strictly as YYYY-MM-DD, e.g. 2027-01-14",
  "plateLot":      "Plate lot or microplate lot number, e.g. HI3-144",
  "coaDate":       "COA issue or certificate date formatted strictly as YYYY-MM-DD, e.g. 2026-02-13",
  "curveGeometry": "Curve geometry or fitting method as printed, e.g. 4 Point method"
}

Rules:
- Return ONLY the JSON object — nothing else
- Dates must be YYYY-MM-DD; convert any other format (DD/MM/YYYY, Month DD YYYY, etc.)
- Use null for any field you cannot confidently identify in the document
- Never invent or guess values`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { fileData, mediaType } = req.body || {}

  if (!fileData || !mediaType) {
    return res.status(400).json({ error: 'fileData and mediaType are required' })
  }

  // Build the appropriate content block for the file type
  let fileBlock
  if (mediaType === 'application/pdf') {
    fileBlock = {
      type: 'document',
      source: { type: 'base64', media_type: 'application/pdf', data: fileData },
    }
  } else if (/^image\/(jpeg|jpg|png|gif|webp)$/i.test(mediaType)) {
    fileBlock = {
      type: 'image',
      source: { type: 'base64', media_type: mediaType, data: fileData },
    }
  } else {
    return res.status(400).json({
      error: `Unsupported file type "${mediaType}". Upload a PDF or image (JPEG, PNG, WebP).`,
    })
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 512,
      system: [
        {
          type: 'text',
          text: SYSTEM,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        {
          role: 'user',
          content: [
            fileBlock,
            { type: 'text', text: PROMPT },
          ],
        },
      ],
    })

    const raw = message.content[0]?.text?.trim() || ''

    // Parse JSON — try whole response first, then extract via regex
    let fields
    try {
      fields = JSON.parse(raw)
    } catch {
      const m = raw.match(/\{[\s\S]*\}/)
      if (!m) throw new Error('Claude response did not contain valid JSON')
      fields = JSON.parse(m[0])
    }

    return res.status(200).json({ success: true, fields })

  } catch (err) {
    console.error('[extract-coa]', err.message)
    return res.status(500).json({ error: err.message || 'AI extraction failed' })
  }
}
