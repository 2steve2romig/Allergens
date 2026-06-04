import { useState, useCallback, useEffect } from 'react'
import Sidebar from './components/Sidebar.jsx'
import DemoModal from './components/DemoModal.jsx'
import DemoGuide from './components/DemoGuide.jsx'
import TopBar from './components/TopBar.jsx'
import ResultsView from './views/ResultsView.jsx'
import Step1View from './views/Step1View.jsx'
import Step2View from './views/Step2View.jsx'
import DetailView from './views/DetailView.jsx'
import { initialCoaFields, initialResults, initialQuant } from './data.js'
import { getAllergen } from './allergens.js'
import { calcStdRows, calcSampleRows, fitCurve, validationSummary } from './utils.js'
import { fetchResults, upsertResult, upsertMany, isConfigured } from './lib/db.js'

function loadLS(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback }
  catch { return fallback }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload  = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function App() {
  const [view,                setView]                = useState('results')
  const [showDemoModal,       setShowDemoModal]       = useState(false)
  const [activeScenario,      setActiveScenario]      = useState(null)
  const [activeStep,          setActiveStep]          = useState(0)
  const [dbStatus,            setDbStatus]            = useState(isConfigured ? 'syncing' : 'local')
  const [step1Stage,          setStep1Stage]          = useState('upload')
  const [ingestProgress,      setIngestProgress]      = useState(0)
  const [extractionSucceeded, setExtractionSucceeded] = useState(false)
  const [validationRun,       setValidationRun]       = useState(false)
  const [imported,            setImported]            = useState(false)
  const [selectedResultId,    setSelectedResultId]    = useState('AQ-24018')
  const [highlightedResultId, setHighlightedResultId] = useState(null)
  const [coaFields,           setCoaFields]           = useState(() => loadLS('aiq-coafields', initialCoaFields))
  const [quant,               setQuant]               = useState(() => loadLS('aiq-quant', initialQuant))
  const [results,             setResults]             = useState(() => loadLS('aiq-results', initialResults))

  useEffect(() => { localStorage.setItem('aiq-coafields', JSON.stringify(coaFields)) }, [coaFields])
  useEffect(() => { localStorage.setItem('aiq-quant', JSON.stringify(quant)) }, [quant])
  useEffect(() => { localStorage.setItem('aiq-results', JSON.stringify(results)) }, [results])

  // Supabase sync — runs once on mount; localStorage is the fast local cache
  useEffect(() => {
    if (!isConfigured) return
    fetchResults()
      .then(remote => {
        if (remote.length > 0) {
          // Remote has data — use it as source of truth
          setResults(remote)
          localStorage.setItem('aiq-results', JSON.stringify(remote))
        } else {
          // Supabase is empty (first time) — seed it from initial data
          upsertMany(initialResults).catch(console.warn)
        }
        setDbStatus('synced')
      })
      .catch(err => {
        console.warn('[AllergenIQ] Supabase sync failed:', err)
        setDbStatus('error')
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fieldValue = useCallback((key) => (
    coaFields.find(f => f.key === key)?.value || ''
  ), [coaFields])

  const updateCoaField = useCallback((key, value) => {
    setCoaFields(prev => prev.map(f => f.key === key ? { ...f, value } : f))
    setValidationRun(false)
  }, [])

  // Bulk-update coaFields from an AI extraction result object
  const applyExtractedFields = useCallback((extracted) => {
    setCoaFields(prev => prev.map(f =>
      extracted[f.key] != null ? { ...f, value: String(extracted[f.key]) } : f
    ))
  }, [])

  // Demo simulation (no file)
  const runDemoIngestion = useCallback(() => {
    setStep1Stage('processing')
    setIngestProgress(0)
    setValidationRun(false)
    setExtractionSucceeded(false)
    const marks = [18, 39, 63, 84, 100]
    marks.forEach((pct, i) => {
      setTimeout(() => {
        setIngestProgress(pct)
        if (pct === 100) setTimeout(() => setStep1Stage('success'), 350)
      }, 350 + i * 420)
    })
  }, [])

  // Real AI extraction (File object provided)
  const runRealIngestion = useCallback(async (file) => {
    setStep1Stage('processing')
    setIngestProgress(0)
    setValidationRun(false)
    setExtractionSucceeded(false)

    // Animate progress while the API call is in flight
    let stopped = false
    ;[12, 28, 46, 64, 80, 90].forEach((pct, i) => {
      setTimeout(() => { if (!stopped) setIngestProgress(pct) }, i * 900)
    })

    try {
      const fileData = await fileToBase64(file)
      const mediaType = file.type || 'application/pdf'

      const res  = await fetch('/api/extract-coa', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ fileData, mediaType }),
      })
      const data = await res.json()

      stopped = true

      if (data.success && data.fields) {
        applyExtractedFields(data.fields)
        setExtractionSucceeded(true)
      }
    } catch (err) {
      stopped = true
      console.error('[AllergenIQ] AI extraction failed:', err)
    }

    setIngestProgress(100)
    setTimeout(() => setStep1Stage('success'), 350)
  }, [applyExtractedFields])

  // Unified entry point: null → demo, File → real AI
  const beginIngestion = useCallback((file) => {
    if (file) runRealIngestion(file)
    else      runDemoIngestion()
  }, [runRealIngestion, runDemoIngestion])

  const resetStep1 = useCallback(() => {
    setValidationRun(false)
    setImported(false)
    setStep1Stage('upload')
    setIngestProgress(0)
    setExtractionSucceeded(false)
  }, [])

  const handleImport = useCallback(() => {
    setImported(true)
    setQuant(q => ({ ...q, assayDescription: `Imported from ${fieldValue('product')} lot ${fieldValue('lot')}` }))
    setView('step2')
  }, [fieldValue])

  const saveQuantification = useCallback(() => {
    const allergen    = getAllergen(quant.allergenId)
    const stdRows     = calcStdRows(quant, allergen)
    const curve       = fitCurve(stdRows, allergen)
    const samples     = calcSampleRows(quant, allergen, curve, stdRows)
    const quantifiable = samples.filter(s => s.rangeClass === 'green').length
    const flagged      = samples.length - quantifiable
    const id           = 'AQ-' + String(24019 + Math.floor(Math.random() * 70)).padStart(5, '0')
    const newResult    = {
      id,
      date:          quant.assayDate,
      assay:         allergen.name,
      lot:           fieldValue('lot'),
      operator:      quant.operator,
      sampleCount:   samples.length,
      quantifiable:  `${quantifiable} / ${samples.length}`,
      flags:         flagged ? `${flagged} outside RoQ` : 'None',
      status:        'Completed',
      product:       fieldValue('product'),
      kit:           fieldValue('catalogNo'),
      notes:         quant.assayDescription,
      resultSamples: samples,
      savedQuant:    { ...quant },
    }
    setResults(prev => [newResult, ...prev])
    setSelectedResultId(id)
    setHighlightedResultId(id)
    setView('results')
    upsertResult(newResult).catch(err => console.warn('[AllergenIQ] Supabase save failed:', err))
  }, [quant, fieldValue])

  // Apply a single step's navigation + state directives
  const applyStep = useCallback((scenario, step) => {
    if (step.applyScenarioData) {
      if (scenario.coaFields) setCoaFields(scenario.coaFields)
      if (scenario.quant)     setQuant(scenario.quant)
    }
    if (step.setResultId      !== undefined) setSelectedResultId(step.setResultId)
    if (step.setStep1Stage    !== undefined) setStep1Stage(step.setStep1Stage)
    if (step.setValidationRun !== undefined) setValidationRun(step.setValidationRun)
    if (step.setImported      !== undefined) setImported(step.setImported)
    if (step.view)                           setView(step.view)
  }, [])

  const loadScenario = useCallback((scenario) => {
    setShowDemoModal(false)
    setActiveScenario(scenario)
    setActiveStep(0)
    applyStep(scenario, scenario.steps[0])
  }, [applyStep])

  const demoNext = useCallback(() => {
    const next = activeStep + 1
    if (next < activeScenario.steps.length) {
      setActiveStep(next)
      applyStep(activeScenario, activeScenario.steps[next])
    }
  }, [activeScenario, activeStep, applyStep])

  const demoPrev = useCallback(() => {
    const back = activeStep - 1
    if (back >= 0) {
      setActiveStep(back)
      applyStep(activeScenario, activeScenario.steps[back])
    }
  }, [activeScenario, activeStep, applyStep])

  const startNewWorkflow = useCallback(() => {
    setValidationRun(false)
    setImported(false)
    setStep1Stage('upload')
    setIngestProgress(0)
    setExtractionSucceeded(false)
    setView('step1')
  }, [])

  const sum           = validationSummary(coaFields)
  const currentResult = results.find(r => r.id === selectedResultId) || results[0]

  return (
    <div className="app">
      {showDemoModal && (
        <DemoModal
          onSelect={loadScenario}
          onClose={() => setShowDemoModal(false)}
        />
      )}
      {activeScenario && (
        <DemoGuide
          scenario={activeScenario}
          stepIndex={activeStep}
          onNext={demoNext}
          onPrev={demoPrev}
          onClose={() => setActiveScenario(null)}
        />
      )}
      <Sidebar view={view} setView={setView} startNewWorkflow={startNewWorkflow} openDemoModal={() => setShowDemoModal(true)} />
      <main className="main">
        <TopBar
          view={view}
          setView={setView}
          startNewWorkflow={startNewWorkflow}
          step1Stage={step1Stage}
          validationRun={validationRun}
          sum={sum}
          dbStatus={dbStatus}
        />
        <div className="page">
          {view === 'results' && (
            <ResultsView
              results={results}
              highlightedResultId={highlightedResultId}
              coaFields={coaFields}
              setSelectedResultId={setSelectedResultId}
              setView={setView}
            />
          )}
          {view === 'step1' && (
            <Step1View
              step1Stage={step1Stage}
              setStep1Stage={setStep1Stage}
              ingestProgress={ingestProgress}
              validationRun={validationRun}
              setValidationRun={setValidationRun}
              imported={imported}
              coaFields={coaFields}
              updateCoaField={updateCoaField}
              sum={sum}
              beginIngestion={beginIngestion}
              extractionSucceeded={extractionSucceeded}
              resetStep1={resetStep1}
              handleImport={handleImport}
            />
          )}
          {view === 'step2' && (
            <Step2View
              coaFields={coaFields}
              quant={quant}
              setQuant={setQuant}
              fieldValue={fieldValue}
              saveQuantification={saveQuantification}
            />
          )}
          {view === 'detail' && (
            <DetailView
              result={currentResult}
              fieldValue={fieldValue}
              setView={setView}
            />
          )}
        </div>
      </main>
    </div>
  )
}
