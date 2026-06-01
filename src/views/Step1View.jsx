import { ruleCheck } from '../utils.js'

const processingSteps = [
  { label: 'Reading file',                    threshold: 20  },
  { label: 'Identifying document type',       threshold: 40  },
  { label: 'Extracting fields and values',    threshold: 68  },
  { label: 'Mapping data to master table',    threshold: 86  },
  { label: 'Preparing validation rules',      threshold: 100 },
]

export default function Step1View({
  step1Stage, setStep1Stage, ingestProgress,
  validationRun, setValidationRun, imported,
  coaFields, updateCoaField, sum,
  beginSequentialIngestion, resetStep1, handleImport,
}) {
  return (
    <div className="stack">
      <div className="workflow">
        <div className="step active"><div className="dot">1</div><div>Upload COA</div></div>
        <div className="arrow">→</div>
        <div className={`step ${imported ? 'done' : ''}`}><div className="dot">2</div><div>Quantification</div></div>
        <div className="arrow">→</div>
        <div className="step"><div className="dot">3</div><div>Result</div></div>
      </div>

      {step1Stage === 'upload' && <UploadStage beginSequentialIngestion={beginSequentialIngestion} />}
      {step1Stage === 'processing' && <ProcessingStage ingestProgress={ingestProgress} />}
      {step1Stage === 'success' && <SuccessStage coaFields={coaFields} onReview={() => setStep1Stage('review')} />}
      {step1Stage === 'review' && (
        <ReviewStage
          coaFields={coaFields}
          updateCoaField={updateCoaField}
          validationRun={validationRun}
          setValidationRun={setValidationRun}
          sum={sum}
          resetStep1={resetStep1}
          handleImport={handleImport}
        />
      )}
    </div>
  )
}

function UploadStage({ beginSequentialIngestion }) {
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
            Supported files: PDF, JPG, PNG, Word, and other common document types.
          </div>
          <div className="dropzone-actions">
            <button className="btn primary" onClick={beginSequentialIngestion}>Browse Files</button>
            <button className="btn ghost"   onClick={beginSequentialIngestion}>Load Demo COA</button>
          </div>
        </div>
        <div className="small muted">
          Demo flow uses <strong>COA-KIT3065-LOT307626.pdf</strong> as the uploaded source file.
        </div>
      </div>
    </div>
  )
}

function ProcessingStage({ ingestProgress }) {
  return (
    <div className="card seq-shell">
      <div className="card-header">
        <div>
          <div className="section-title">AI COA Ingestion</div>
          <div className="small muted">The system is processing the uploaded document and extracting all detectable fields and values.</div>
        </div>
        <span className="pill soft">Processing</span>
      </div>
      <div className="card-body stack">
        <div className="uploader compact">
          <div style={{ fontSize: 16, fontWeight: 700 }}>COA-KIT3065-LOT307626.pdf</div>
          <div className="small muted" style={{ marginTop: 6 }}>Uploaded from local machine · AI extraction in progress</div>
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
            const txt    = done ? 'Complete' : active ? 'In progress' : 'Pending'
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

function SuccessStage({ coaFields, onReview }) {
  return (
    <div className="card seq-shell">
      <div className="card-header">
        <div>
          <div className="section-title">COA Extraction Complete</div>
          <div className="small muted">AI successfully ingested the file and prepared the extracted data for review.</div>
        </div>
        <span className="pill good">Extraction successful</span>
      </div>
      <div className="card-body stack">
        <div className="success-banner">
          <div className="success-icon">✓</div>
          <div>
            <div style={{ fontWeight: 700 }}>COA extracted successfully</div>
            <div className="small muted" style={{ marginTop: 6 }}>
              All detectable fields and values were ingested into the master table and linked to the validation rules.
            </div>
          </div>
        </div>
        <div className="grid grid-3">
          <div className="meta"><div className="k">Fields Extracted</div><div className="v">{coaFields.length}</div></div>
          <div className="meta"><div className="k">Rules Loaded</div><div className="v">{coaFields.length}</div></div>
          <div className="meta"><div className="k">Status</div><div className="v">Ready for review</div></div>
        </div>
        <div className="footer-actions">
          <div className="small muted">Next step: review the editable master table, validate the fields, then import into quantification.</div>
          <button className="btn primary" onClick={onReview}>Review Extracted Data</button>
        </div>
      </div>
    </div>
  )
}

function ruleLabel(f) {
  let r = f.required ? 'Required' : 'Optional'
  if (f.key === 'catalogNo') r += ' · KIT####'
  if (f.key === 'lot') r += ' · 6 digits'
  if (f.key === 'expiryDate' || f.key === 'coaDate') r += ' · YYYY-MM-DD'
  return r
}

function ReviewStage({ coaFields, updateCoaField, validationRun, setValidationRun, sum, resetStep1, handleImport }) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="section-title">Editable COA Master Table</div>
          <div className="small muted">Review extracted values, edit any field, validate, and import into the quantification workflow.</div>
        </div>
        {sum.complete && validationRun
          ? <span className="pill good">Validation complete</span>
          : <span className="pill warn">Review required</span>}
      </div>
      <div className="card-body stack">
        <div className="grid grid-4">
          <div className="meta"><div className="k">Uploaded File</div><div className="v">COA-KIT3065-LOT307626.pdf</div></div>
          <div className="meta"><div className="k">Extracted Fields</div><div className="v">{coaFields.length}</div></div>
          <div className="meta"><div className="k">Valid Fields</div><div className="v">{validationRun ? sum.valid : '—'}</div></div>
          <div className="meta"><div className="k">Ready to Import</div><div className="v">{sum.complete && validationRun ? 'Yes' : 'No'}</div></div>
        </div>

        <div className="table-shell">
          <table className="editable">
            <thead>
              <tr>
                <th style={{ width: '26%' }}>Field</th>
                <th>Extracted Value</th>
                <th style={{ width: '17%' }}>Rule</th>
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
                    <td>{ruleLabel(f)}</td>
                    <td className={check.ok ? 'rule-pass' : 'rule-fail'}>
                      {validationRun ? check.msg : 'Awaiting validation'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="card" style={{ boxShadow: 'none' }}>
          <div className="card-header">
            <div>
              <div className="section-title">Validation Summary</div>
              <div className="small muted">Validate all extracted data against the expected rule for each field before import.</div>
            </div>
            {sum.complete && validationRun
              ? <span className="pill good">All rules passed</span>
              : <span className="pill warn">Validation required</span>}
          </div>
          <div className="card-body stack">
            <div className="grid grid-3">
              <div className="meta"><div className="k">Valid Fields</div><div className="v">{validationRun ? sum.valid : 0}</div></div>
              <div className="meta"><div className="k">Flagged Fields</div><div className="v">{validationRun ? sum.invalid : coaFields.length}</div></div>
              <div className="meta"><div className="k">Import Status</div><div className="v">{sum.complete && validationRun ? 'Ready' : 'Pending validation'}</div></div>
            </div>
            <div className="footer-actions">
              <div className="small muted">Users can edit any value before validating. Import remains disabled until validation passes.</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button className="btn" onClick={resetStep1}>Start Over</button>
                <button className="btn" onClick={() => setValidationRun(true)}>Validate</button>
                <button className="btn primary" disabled={!(sum.complete && validationRun)} onClick={handleImport}>Import</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
