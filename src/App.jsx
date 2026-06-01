import { useState, useCallback, useEffect } from 'react'
import Sidebar from './components/Sidebar.jsx'
import TopBar from './components/TopBar.jsx'
import ResultsView from './views/ResultsView.jsx'
import Step1View from './views/Step1View.jsx'
import Step2View from './views/Step2View.jsx'
import DetailView from './views/DetailView.jsx'
import { initialCoaFields, initialResults, initialQuant } from './data.js'
import { getAllergen } from './allergens.js'
import { calcStdRows, calcSampleRows, fitCurve, validationSummary } from './utils.js'

function loadLS(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback }
  catch { return fallback }
}

export default function App() {
  const [view,                setView]                = useState('results')
  const [step1Stage,          setStep1Stage]          = useState('upload')
  const [ingestProgress,      setIngestProgress]      = useState(0)
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

  const fieldValue = useCallback((key) => (
    coaFields.find(f => f.key === key)?.value || ''
  ), [coaFields])

  const updateCoaField = useCallback((key, value) => {
    setCoaFields(prev => prev.map(f => f.key === key ? { ...f, value } : f))
    setValidationRun(false)
  }, [])

  const beginSequentialIngestion = useCallback(() => {
    setStep1Stage('processing')
    setIngestProgress(0)
    setValidationRun(false)
    const marks = [18, 39, 63, 84, 100]
    marks.forEach((value, index) => {
      setTimeout(() => {
        setIngestProgress(value)
        if (value === 100) setTimeout(() => setStep1Stage('success'), 350)
      }, 350 + index * 420)
    })
  }, [])

  const resetStep1 = useCallback(() => {
    setValidationRun(false)
    setImported(false)
    setStep1Stage('upload')
    setIngestProgress(0)
  }, [])

  const handleImport = useCallback(() => {
    setImported(true)
    setQuant(q => ({ ...q, assayDescription: `Imported from ${fieldValue('product')} lot ${fieldValue('lot')}` }))
    setView('step2')
  }, [fieldValue])

  const saveQuantification = useCallback(() => {
    const allergen   = getAllergen(quant.allergenId)
    const stdRows    = calcStdRows(quant, allergen)
    const curve      = fitCurve(stdRows, allergen)
    const samples    = calcSampleRows(quant, allergen, curve, stdRows)
    const quantifiable = samples.filter(s => s.rangeClass === 'green').length
    const flagged      = samples.length - quantifiable
    const id           = 'AQ-' + String(24019 + Math.floor(Math.random() * 70)).padStart(5, '0')
    const newResult    = {
      id,
      date:         quant.assayDate,
      assay:        allergen.name,
      lot:          fieldValue('lot'),
      operator:     quant.operator,
      sampleCount:  samples.length,
      quantifiable: `${quantifiable} / ${samples.length}`,
      flags:        flagged ? `${flagged} outside RoQ` : 'None',
      status:       'Completed',
      product:      fieldValue('product'),
      kit:          fieldValue('catalogNo'),
      notes:        quant.assayDescription,
      resultSamples: samples,
    }
    setResults(prev => [newResult, ...prev])
    setSelectedResultId(id)
    setHighlightedResultId(id)
    setView('detail')
  }, [quant, fieldValue])

  const startNewWorkflow = useCallback(() => {
    setValidationRun(false)
    setImported(false)
    setStep1Stage('upload')
    setIngestProgress(0)
    setView('step1')
  }, [])

  const loadDemoRun = useCallback(() => {
    setQuant(initialQuant)
    setCoaFields(initialCoaFields)
    setValidationRun(true)
    setImported(true)
    setView('step2')
  }, [])

const sum           = validationSummary(coaFields)
  const currentResult = results.find(r => r.id === selectedResultId) || results[0]

  return (
    <div className="app">
      <Sidebar view={view} setView={setView} startNewWorkflow={startNewWorkflow} />
      <main className="main">
        <TopBar
          view={view}
          setView={setView}
          startNewWorkflow={startNewWorkflow}
          loadDemoRun={loadDemoRun}
          step1Stage={step1Stage}
          validationRun={validationRun}
          sum={sum}
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
              beginSequentialIngestion={beginSequentialIngestion}
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
