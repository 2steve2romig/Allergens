const headerMap = {
  results:  ['AllergenIQ Results Workspace',         'Review historical allergen quantification runs and create a new quantification from a COA.'],
  step1:    ['Step 1 of 2 — Upload COA',             'Import a Certificate of Analysis, review extracted values, validate each field, and import into quantification.'],
  step2:    ['Step 2 of 2 — Quantification',         'Run the worksheet-style quantification flow using imported COA values and sample absorbance data.'],
  detail:   ['Quantification Result Detail',          'Review the saved quantification, assay inputs, and calculated sample concentrations.'],
  help:     ['AllergenIQ Help',                      'View the guided workflow and demo usage notes.'],
}

export default function TopBar({ view, setView, startNewWorkflow, loadDemoRun, step1Stage, validationRun, sum }) {
  const [title, subtitle] = headerMap[view] || ['', '']

  const renderActions = () => {
    if (view === 'results') return (
      <>
        <button className="btn ghost" onClick={loadDemoRun}>Load Demo Run</button>
        <button className="btn primary" onClick={startNewWorkflow}>+ New Quantification</button>
      </>
    )

    if (view === 'step1') {
      const labelMap = {
        upload:     'Awaiting upload',
        processing: 'AI processing…',
        success:    'Extraction complete',
        review:     sum.complete && validationRun ? 'Validated' : 'Awaiting validation',
      }
      const clsMap = {
        upload:     'warn',
        processing: 'soft',
        success:    'good',
        review:     sum.complete && validationRun ? 'good' : 'warn',
      }
      return (
        <>
          <span className={`pill ${clsMap[step1Stage]}`}>{labelMap[step1Stage]}</span>
          <button className="btn" onClick={() => setView('results')}>Cancel</button>
        </>
      )
    }

    if (view === 'step2') return (
      <>
        <span className="pill soft">COA imported</span>
        <button className="btn" onClick={() => setView('step1')}>← Back to Step 1</button>
      </>
    )

    if (view === 'detail') return (
      <>
        <button className="btn ghost" onClick={startNewWorkflow}>+ New Quantification</button>
        <button className="btn" onClick={() => setView('results')}>Back to Results</button>
      </>
    )

    return <button className="btn" onClick={() => setView('results')}>Results</button>
  }

  return (
    <div className="topbar">
      <div>
        <div className="headline">{title}</div>
        <div className="subtitle">{subtitle}</div>
      </div>
      <div className="top-actions">{renderActions()}</div>
    </div>
  )
}
