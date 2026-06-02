import { useState, useRef } from 'react'
import { ruleCheck } from '../utils.js'

const processingSteps = [
  { label: 'Reading document structure',    threshold: 20  },
  { label: 'Identifying document type',     threshold: 40  },
  { label: 'Extracting fields and values',  threshold: 68  },
  { label: 'Mapping data to master table',  threshold: 86  },
  { label: 'Validating extraction results', threshold: 100 },
]

const CONFIDENCE = [
  { key: 'product',       conf: 'high'   },
  { key: 'catalogNo',     conf: 'high'   },
  { key: 'lot',           conf: 'high'   },
  { key: 'expiryDate',    conf: 'high'   },
  { key: 'plateLot',      conf: 'medium' },
  { key: 'coaDate',       conf: 'high'   },
  { key: 'curveGeometry', conf: 'medium' },
]

export default function Step1View({
  step1Stage, setStep1Stage, ingestProgress,
  validationRun, setValidationRun, imported,
  coaFields, updateCoaField, sum,
  beginIngestion, extractionSucceeded,
  resetStep1, handleImport,
}) {
  const [filename, setFilename] = useState('')
  const [isDemo,   setIsDemo]   = useState(false)

  // file = File object for real uploads, null for demo
  const handleFileSelect = (file) => {
    if (file) {
      setFilename(file.name)
      setIsDemo(false)
    } else {
      setFilename('COA-KIT3065-LOT307626.pdf')
      setIsDemo(true)
    }
    beginIngestion(file)
  }

  return (
    <div className="stack">
      <div className="workflow">
        <div className="step active"><div className="dot">1</div><div>Upload COA</div></div>
        <div className="arrow">→</div>
        <div className={`step ${imported ? 'done' : ''}`}><div className="dot">2</div><div>Quantification</div></div>
        <div className="arrow">→</div>
        <div className="step"><div className="dot">3</div><div>Result</div></div>
      </div>

      {step1Stage === 'upload' && <UploadStage onStart={handleFileSelect} />}

      {step1Stage === 'processing' && (
        <ProcessingStage
          ingestProgress={ingestProgress}
          filename={filename || 'COA-KIT3065-LOT307626.pdf'}
          isDemo={isDemo}
        />
      )}

      {step1Stage === 'success' && (
        <SuccessStage
          coaFields={coaFields}
          filename={filename || 'COA-KIT3065-LOT307626.pdf'}
          isDemo={isDemo}
          extractionSucceeded={extractionSucceeded}
          onReview={() => { setStep1Stage('review'); setValidationRun(true) }}
        />
      )}

      {step1Stage === 'review' && (
        <ReviewStage
          coaFields={coaFields}
          updateCoaField={updateCoaField}
          validationRun={validationRun}
          setValidationRun={setValidationRun}
          sum={sum}
          filename={filename || 'COA-KIT3065-LOT307626.pdf'}
          resetStep1={resetStep1}
          handleImport={handleImport}
        />
      )}
    </div>
  )
}

/* ── Upload ──────────────────────────────────────────────────────────── */

function UploadStage({ onStart }) {
  const fileRef = useRef(null)

  const handleFile = e => {
    const file = e.target.files[0]
    if (file) onStart(file)   // real File object
  }

  return (
    <div className="card seq-shell">
      <div className="card-header">
        <div>
          <div className="section-title">Add COA</div>
          <div className="small muted">Upload a Certificate of Analysis to begin AI extraction.</div>
        </div>
        <span className="pill soft">Ready for upload</span>
      </div>
      <div className="card-body stack">
        <div className="uploader">
          <div style={{ fontSize: 18, fontWeight: 700 }}>Drag and drop your COA here</div>
          <div className="small muted" style={{ marginTop: 8 }}>
            Supported: PDF, JPG, PNG, WebP
          </div>
          <div className="dropzone-actions">
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              style={{ display: 'none' }}
              onChange={handleFile}
            />
            <button className="btn primary" onClick={() => fileRef.current?.click()}>Browse Files</button>
            <button className="btn ghost"   onClick={() => onStart(null)}>Load Demo COA</button>
          </div>
        </div>
        <div className="small muted">
          Demo flow uses <strong>COA-KIT3065-LOT307626.pdf</strong> (AlerTox ELISA Histamine, Lot 307626).
        </div>
      </div>
    </div>
  )
}

/* ── Processing ──────────────────────────────────────────────────────── */

function ProcessingStage({ ingestProgress, filename, isDemo }) {
  return (
    <div className="card seq-shell">
      <div className="card-header">
        <div>
          <div className="section-title">AI COA Ingestion</div>
          <div className="small muted">
            {isDemo
              ? 'Running demo extraction on the pre-loaded COA.'
              : 'Sending your document to Claude for field extraction — this takes a few seconds.'}
          </div>
        </div>
        <span className="pill soft">Processing</span>
      </div>
      <div className="card-body stack">
        <div className="uploader compact">
          <div style={{ fontSize: 16, fontWeight: 700 }}>{filename}</div>
          <div className="small muted" style={{ marginTop: 6 }}>
            {isDemo ? 'Demo document · Simulated extraction' : 'Uploaded · AI extraction in progress'}
          </div>
        </div>
        <div className="progress-wrap">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${ingestProgress}%` }} />
          </div>
          <div style={{ fontWeight: 700, minWidth: 52, textAlign: 'right' }}>{ingestProgress}%</div>
        </div>
        <div className="status-list">
          {processingSteps.map(step => {
            const done   = ingestProgress >= step.threshold
            const active = !done && ingestProgress >= step.threshold - 20
            const cls    = done ? 'done' : active ? 'active' : ''
            const txt    = done ? 'Complete' : active ? 'In progress…' : 'Pending'
            return (
              <div key={step.label} className={`status-item ${cls}`}>
                <div>{step.label}</div>
                <div className="small muted">{txt}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ── Success ─────────────────────────────────────────────────────────── */

function SuccessStage({ coaFields, filename, isDemo, extractionSucceeded, onReview }) {
  const confMap = Object.fromEntries(CONFIDENCE.map(c => [c.key, c.conf]))

  const extracted = [
    ...coaFields.map(f => ({
      label: f.label,
      value: f.value,
      conf:  confMap[f.key] || 'medium',
    })),
    { label: 'Standard Curve', value: 'Histamine — 6 standards with OD₄₅₀ values', conf: 'high' },
  ]

  // Banner: green for real success, yellow for fallback, nothing for demo
  const banner = !isDemo && (
    extractionSucceeded ? (
      <div style={{
        background: '#edf7ed', border: '1px solid #6abf69', borderRadius: 12,
        padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: 18, lineHeight: 1 }}>✓</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>AI extraction successful</div>
          <div className="small muted" style={{ marginTop: 4 }}>
            Fields were extracted directly from <strong>{filename}</strong> by Claude.
            Review and edit any value before importing.
          </div>
        </div>
      </div>
    ) : (
      <div style={{
        background: '#fff8e6', border: '1px solid #f0c040', borderRadius: 12,
        padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: 18, lineHeight: 1 }}>⚠</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>AI extraction encountered an issue</div>
          <div className="small muted" style={{ marginTop: 4 }}>
            <strong>{filename}</strong> could not be processed — showing pre-loaded demo values.
            In production, Claude reads your uploaded document directly.
          </div>
        </div>
      </div>
    )
  )

  return (
    <div className="card seq-shell">
      <div className="card-header">
        <div>
          <div className="section-title">COA Extraction Complete</div>
          <div className="small muted">
            {isDemo
              ? 'Demo extraction complete — review pre-loaded values below.'
              : extractionSucceeded
                ? 'Claude successfully extracted all detectable fields from your document.'
                : 'Extraction issue — pre-loaded demo values shown for review.'}
          </div>
        </div>
        <span className="pill good">Extraction successful</span>
      </div>
      <div className="card-body stack">

        {banner}

        <div className="success-banner">
          <div className="success-icon">✓</div>
          <div>
            <div style={{ fontWeight: 700 }}>{filename}</div>
            <div className="small muted" style={{ marginTop: 4 }}>
              {extracted.length} fields extracted and linked to validation rules. Review before importing.
            </div>
          </div>
        </div>

        <div>
          <div className="small muted" style={{ marginBottom: 10 }}>
            {isDemo ? 'Demo Extracted Data' : extractionSucceeded ? 'AI Extracted Data' : 'Pre-loaded Data (demo fallback)'}
          </div>
          <div className="table-shell">
            <table>
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Field</th>
                  <th>Extracted Value</th>
                  <th style={{ width: '140px' }}>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {extracted.map((item, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--muted)', fontSize: 13 }}>{item.label}</td>
                    <td style={{ fontWeight: 600 }}>{item.value}</td>
                    <td>
                      <span className={`pill ${item.conf === 'high' ? 'good' : 'warn'}`}>
                        {item.conf === 'high' ? 'High' : 'Medium'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="footer-actions">
          <div className="small muted">Review and edit any extracted value before importing into quantification.</div>
          <button className="btn primary" onClick={onReview}>Review &amp; Validate →</button>
        </div>
      </div>
    </div>
  )
}

/* ── Review ──────────────────────────────────────────────────────────── */

function ruleLabel(f) {
  let r = f.required ? 'Required' : 'Optional'
  if (f.key === 'catalogNo') r += ' · KIT####'
  if (f.key === 'lot') r += ' · 6 digits'
  if (f.key === 'expiryDate' || f.key === 'coaDate') r += ' · YYYY-MM-DD'
  return r
}

function ReviewStage({ coaFields, updateCoaField, sum, filename, resetStep1, handleImport }) {
  const [showRules, setShowRules] = useState(false)

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="section-title">Editable COA Master Table</div>
          <div className="small muted">Review extracted values, edit any field, validate, then import.</div>
        </div>
        {sum.complete
          ? <span className="pill good">Validation complete</span>
          : <span className="pill warn">Review required</span>}
      </div>
      <div className="card-body stack">
        <div className="grid grid-4">
          <div className="meta"><div className="k">Source File</div><div className="v">{filename}</div></div>
          <div className="meta"><div className="k">Extracted Fields</div><div className="v">{coaFields.length}</div></div>
          <div className="meta"><div className="k">Valid Fields</div><div className="v">{sum.valid}</div></div>
          <div className="meta"><div className="k">Import Ready</div><div className="v">{sum.complete ? 'Yes' : 'No'}</div></div>
        </div>

        {showRules && (
          <div style={{
            background: '#f4f7fb', border: '1px solid #dde6f0', borderRadius: 10,
            padding: '14px 16px',
          }}>
            <div className="small muted" style={{ marginBottom: 10, fontWeight: 600 }}>Validation Rules</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {coaFields.map(f => (
                <div key={f.key} style={{ display: 'flex', gap: 12, fontSize: 13 }}>
                  <span style={{ width: 160, color: 'var(--muted)', flexShrink: 0 }}>{f.label}</span>
                  <span style={{ fontWeight: 500 }}>{ruleLabel(f)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="table-shell">
          <table className="editable">
            <thead>
              <tr>
                <th style={{ width: '26%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    Field
                    <button
                      onClick={() => setShowRules(s => !s)}
                      title={showRules ? 'Hide validation rules' : 'Show validation rules'}
                      style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: 18, height: 18, borderRadius: '50%', border: 'none',
                        background: showRules ? 'var(--accent)' : '#c4d0de',
                        color: '#fff', fontSize: 11, fontWeight: 700,
                        cursor: 'pointer', flexShrink: 0, lineHeight: 1,
                        fontStyle: 'italic', fontFamily: 'Georgia, serif',
                      }}
                    >i</button>
                  </div>
                </th>
                <th>Extracted Value</th>
                <th style={{ width: '17%' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {coaFields.map(f => {
                const check = ruleCheck(f)
                return (
                  <tr key={f.key}>
                    <td>{f.label}</td>
                    <td>
                      <input
                        type={f.type === 'date' ? 'date' : 'text'}
                        value={f.value}
                        onChange={e => updateCoaField(f.key, e.target.value)}
                      />
                    </td>
                    <td className={check.ok ? 'rule-pass' : 'rule-fail'}>
                      {check.ok ? '✓ Valid' : check.msg}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="card" style={{ boxShadow: 'none' }}>
          <div className="card-header">
            <div><div className="section-title">Validation Summary</div></div>
            {sum.complete
              ? <span className="pill good">All rules passed</span>
              : <span className="pill warn">Errors detected</span>}
          </div>
          <div className="card-body stack">
            <div className="grid grid-3">
              <div className="meta"><div className="k">Valid Fields</div><div className="v">{sum.valid} of {sum.total}</div></div>
              <div className="meta"><div className="k">Flagged</div><div className="v">{sum.invalid}</div></div>
              <div className="meta"><div className="k">Import Status</div><div className="v">{sum.complete ? 'Ready' : 'Fix errors to import'}</div></div>
            </div>
            <div className="footer-actions">
              <div className="small muted">Edit any value above to correct errors. Import unlocks when all fields pass.</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button className="btn" onClick={resetStep1}>Start Over</button>
                <button className="btn primary" disabled={!sum.complete} onClick={handleImport}>
                  Import into Quantification →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
