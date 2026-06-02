import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Null when env vars aren't configured — app falls back to localStorage
const supabase = (url && key) ? createClient(url, key) : null

export const isConfigured = Boolean(supabase)

/** Fetch all results ordered newest-first. Returns null if not configured. */
export async function fetchResults() {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('results')
    .select('id, data')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(r => r.data)
}

/** Insert or update a single result. No-op if not configured. */
export async function upsertResult(result) {
  if (!supabase) return
  const { error } = await supabase
    .from('results')
    .upsert({ id: result.id, data: result })
  if (error) throw error
}

/** Bulk insert or update an array of results. No-op if not configured. */
export async function upsertMany(results) {
  if (!supabase) return
  const { error } = await supabase
    .from('results')
    .upsert(results.map(r => ({ id: r.id, data: r })))
  if (error) throw error
}
