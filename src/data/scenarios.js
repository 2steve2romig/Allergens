const HISTAMINE_CURVE = [
  { od1: 1.989, od2: 1.983 },
  { od1: 1.525, od2: 1.519 },
  { od1: 1.016, od2: 1.010 },
  { od1: 0.762, od2: 0.756 },
  { od1: 0.520, od2: 0.516 },
  { od1: 0.392, od2: 0.388 },
]

const MILK_CURVE = [
  { od1: 0.081, od2: 0.079 },
  { od1: 0.267, od2: 0.271 },
  { od1: 0.673, od2: 0.669 },
  { od1: 1.487, od2: 1.493 },
  { od1: 2.341, od2: 2.337 },
]

const HISTAMINE_COA = [
  { key: 'product',       label: 'Product',        value: 'AlerTox ELISA Histamine (96 tests)', required: true, type: 'text' },
  { key: 'catalogNo',     label: 'Catalog Number', value: 'KIT3065',        required: true, type: 'text' },
  { key: 'lot',           label: 'Lot',            value: '307630',         required: true, type: 'text' },
  { key: 'expiryDate',    label: 'Expiry Date',    value: '2027-01-14',     required: true, type: 'date' },
  { key: 'plateLot',      label: 'Plate Lot',      value: 'HI3-148',        required: true, type: 'text' },
  { key: 'coaDate',       label: 'COA Date',       value: '2026-04-10',     required: true, type: 'date' },
  { key: 'curveGeometry', label: 'Curve Geometry', value: '4 Point method', required: true, type: 'text' },
]

const MILK_COA = [
  { key: 'product',       label: 'Product',        value: 'AlerTox ELISA Milk (96 tests)', required: true, type: 'text' },
  { key: 'catalogNo',     label: 'Catalog Number', value: 'KIT3122',        required: true, type: 'text' },
  { key: 'lot',           label: 'Lot',            value: '221158',         required: true, type: 'text' },
  { key: 'expiryDate',    label: 'Expiry Date',    value: '2027-03-20',     required: true, type: 'date' },
  { key: 'plateLot',      label: 'Plate Lot',      value: 'MI4-221',        required: true, type: 'text' },
  { key: 'coaDate',       label: 'COA Date',       value: '2026-03-15',     required: true, type: 'date' },
  { key: 'curveGeometry', label: 'Curve Geometry', value: '4 Point method', required: true, type: 'text' },
]

// Each step: { title, description, view, setResultId?, setStep1Stage?, setImported?, setValidationRun?, applyScenarioData? }
// navigateToStep() in App.jsx reads these fields to set state and navigate.

export const SCENARIOS = [
  {
    id: 'histamine-release',
    title: 'Histamine Release Testing',
    subtitle: 'Sauce base · fermented stock · brine',
    description: 'Eight production samples evaluated ahead of product release. Two fall outside the range of quantification — demonstrating how AllergenIQ flags and classifies out-of-range results.',
    tags: ['Competitive ELISA', 'Histamine', '8 samples', '6 / 8 quantifiable'],
    roles: 'QA Analyst, Lab Operator',
    time: '5 min',
    color: '#1a6fbf',
    icon: '⚗️',
    coaFields: HISTAMINE_COA,
    quant: {
      allergenId:       'histamine',
      operator:         'Demo User',
      assayDate:        '2026-04-15',
      assayDescription: 'Histamine ELISA — sauce base release testing, Lot 307630',
      standardCurve: HISTAMINE_CURVE,
      samples: [
        { name: 'Sauce Base A',    od1: 0.874, od2: 0.869, dilution: 1 },
        { name: 'Sauce Base B',    od1: 0.654, od2: 0.649, dilution: 1 },
        { name: 'Sauce Base C',    od1: 0.302, od2: 0.296, dilution: 1 },
        { name: 'Sauce Base D',    od1: 0.993, od2: 0.987, dilution: 1 },
        { name: 'Sauce Base E',    od1: 0.513, od2: 0.509, dilution: 1 },
        { name: 'Fermented Stock', od1: 0.741, od2: 0.747, dilution: 5 },
        { name: 'Aged Mash',       od1: 0.449, od2: 0.443, dilution: 5 },
        { name: 'Process Blank',   od1: 1.890, od2: 1.895, dilution: 1 },
      ],
    },
    steps: [
      {
        title: 'Results Workspace',
        description: 'Your historical quantification log. Three completed runs are pre-loaded — two Histamine ELISA runs and one Milk residue CIP validation. Use the search bar and column filters to find runs by assay, operator, or status.',
        view: 'results',
      },
      {
        title: 'Histamine Release Run — AQ-24018',
        description: 'This run tested eight sauce base and fermented stock samples ahead of product release. Six of eight samples were quantifiable — two fell outside the calibrated range and were flagged. Click "View Result" on AQ-24018 to open the full record.',
        view: 'results',
      },
      {
        title: 'Standard Curve — Competitive Inhibition',
        description: 'The fitted quadratic regression. In a competitive ELISA, B/B₀ (%) decreases as concentration increases — OD falls as the analyte outcompetes the labelled antigen for antibody binding sites. R² = 0.9997 here.',
        view: 'detail',
        setResultId: 'AQ-24018',
      },
      {
        title: 'Assay QC Panel',
        description: 'Four automated quality checks against kit-specific thresholds: blank OD adequacy (> 0.5), signal inhibition ratio (Std.0 / Std.N > 2×), monotonically decreasing OD, and curve fit R² (≥ 0.99). All four pass on this run.',
        view: 'detail',
        setResultId: 'AQ-24018',
      },
      {
        title: 'Sample Results with Range Flags',
        description: 'Six samples quantified (green). Sauce Base C is flagged > ULoQ — concentration exceeds the calibrated range and likely needs dilution and re-run. Process Blank is flagged < LoQ — no detectable histamine, as expected for a negative control.',
        view: 'detail',
        setResultId: 'AQ-24018',
      },
      {
        title: 'Run the Quantification Worksheet',
        description: 'The live worksheet pre-populates OD values for this release run. Standard curve fits in real time, and sample concentrations appear immediately. Review the results, then click "Save Result" to archive the run.',
        view: 'step2',
        applyScenarioData: true,
        setImported: true,
      },
    ],
  },

  {
    id: 'milk-cip',
    title: 'Allergen Clearance Verification',
    subtitle: 'Post-CIP milk residue · Line 3 changeover',
    description: 'Verify allergen removal after a cleaning-in-place cycle. Rinse water and surface swabs from a milk-to-nut line changeover. All seven samples quantified within range.',
    tags: ['Sandwich ELISA', 'Milk', '7 samples', '7 / 7 quantifiable'],
    roles: 'Sanitation Lead, QA Manager',
    time: '4 min',
    color: '#2d7a4e',
    icon: '🧹',
    coaFields: MILK_COA,
    quant: {
      allergenId:       'milk',
      operator:         'Demo User',
      assayDate:        '2026-04-15',
      assayDescription: 'Milk residue ELISA — CIP validation, allergen changeover Line 3',
      standardCurve: MILK_CURVE,
      samples: [
        { name: 'Rinse Water 1',    od1: 0.412, od2: 0.408, dilution: 1 },
        { name: 'Rinse Water 2',    od1: 0.289, od2: 0.295, dilution: 1 },
        { name: 'Swab — Line A',    od1: 1.234, od2: 1.228, dilution: 1 },
        { name: 'Swab — Line B',    od1: 0.534, od2: 0.531, dilution: 1 },
        { name: 'Swab — Filler',    od1: 1.756, od2: 1.762, dilution: 1 },
        { name: 'Tank Drain',       od1: 0.673, od2: 0.668, dilution: 1 },
        { name: 'Negative Control', od1: 0.307, od2: 0.311, dilution: 1 },
      ],
    },
    steps: [
      {
        title: 'Sandwich ELISA Worksheet',
        description: 'This is a Milk ELISA run — a sandwich assay. The allergen selector shows "Milk ELISA" and standards run 0 → 10 ppm. Unlike histamine, OD increases with concentration. The blank (Std. 0) has the lowest signal.',
        view: 'step2',
        applyScenarioData: true,
        setImported: true,
      },
      {
        title: 'Standard Curve — Upward Direction',
        description: 'The chart shows an upward curve — the opposite of a competitive ELISA. Regression is fitted as Concentration → OD, then inverted to quantify samples. Look at Table 3: OD values increase down the column from Std. 0 to Std. 4.',
        view: 'step2',
      },
      {
        title: 'Acceptance Criteria — Sandwich Format',
        description: 'Criteria flip for sandwich: blank OD must be LOW (< 0.250), signal must AMPLIFY across the range (Stdn / Std1 > 3×), and OD must increase monotonically. These are automatically evaluated and displayed in the QC panel.',
        view: 'step2',
      },
      {
        title: 'CIP Validation Sample Results',
        description: 'Seven rinse water and swab samples from a post-CIP changeover — all quantified within range. These concentrations inform the pass/fail decision for line release. A result above your facility action limit triggers a re-clean.',
        view: 'step2',
      },
      {
        title: 'Save and Archive',
        description: 'Click "Save Result" to commit this run to the results log. The full record — standard curve, QC metrics, acceptance criteria, and sample concentrations — is stored and accessible from any device via the results table.',
        view: 'step2',
      },
    ],
  },

  {
    id: 'incoming-inspection',
    title: 'Incoming Ingredient Inspection',
    subtitle: 'COA upload → AI extraction → quantification',
    description: 'Full end-to-end workflow. Upload a Certificate of Analysis, watch Claude extract the fields, validate, import into the worksheet, and run a five-sample supplier lot verification.',
    tags: ['Full workflow', 'Competitive ELISA', 'AI extraction', '5 samples'],
    roles: 'Receiving Inspector, QA Analyst',
    time: '6 min',
    color: '#6b3fa0',
    icon: '📋',
    coaFields: HISTAMINE_COA,
    quant: {
      allergenId:       'histamine',
      operator:         'Demo User',
      assayDate:        '2026-04-15',
      assayDescription: 'Incoming ingredient verification — anchovy extract supplier lot',
      standardCurve: HISTAMINE_CURVE,
      samples: [
        { name: 'Tuna Paste Lot A', od1: 0.834, od2: 0.828, dilution: 1 },
        { name: 'Tuna Paste Lot B', od1: 1.102, od2: 1.097, dilution: 1 },
        { name: 'Anchovy Extract',  od1: 0.698, od2: 0.703, dilution: 5 },
        { name: 'Sardine Slurry',   od1: 0.612, od2: 0.606, dilution: 5 },
        { name: 'Process Blank',    od1: 0.488, od2: 0.493, dilution: 1 },
      ],
    },
    steps: [
      {
        title: 'Upload a Certificate of Analysis',
        description: 'Start by uploading the supplier\'s COA. AllergenIQ supports PDF and image formats. Click "Browse Files" to upload a real COA, or click "Load Demo COA" to use the pre-loaded AlerTox Histamine COA (Lot 307630) — then click Next.',
        view: 'step1',
        applyScenarioData: true,
        setStep1Stage: 'upload',
        setImported: false,
      },
      {
        title: 'AI Extraction in Progress',
        description: 'Claude reads the uploaded document and extracts all detectable fields — product name, catalog number, lot, expiry date, plate lot, COA date, and curve geometry. Five processing stages complete in sequence. Wait for 100%, then click Next.',
        view: 'step1',
        setStep1Stage: 'processing',
      },
      {
        title: 'Review AI Extracted Fields',
        description: 'Every extracted field is shown with a confidence rating. High confidence means the value was unambiguous in the document. Medium confidence fields should be reviewed carefully. Click "Review & Validate →" to proceed.',
        view: 'step1',
        setStep1Stage: 'success',
      },
      {
        title: 'Validate Before Importing',
        description: 'The editable master table lets you correct any value before importing. Validation rules run live on every keystroke — the import button unlocks only when all fields pass. Click "Import into Quantification →" when ready.',
        view: 'step1',
        setStep1Stage: 'review',
        setValidationRun: true,
      },
      {
        title: 'Quantification Worksheet',
        description: 'COA values are pre-populated from the imported document. Enter duplicate OD readings for each standard to fit the curve, then enter sample OD readings to calculate concentrations in real time.',
        view: 'step2',
        setImported: true,
      },
      {
        title: 'Supplier Lot Results',
        description: 'Five anchovy extract and tuna paste samples quantified against the calibrated histamine range. Results feed directly into a traceable record linked to the imported COA. Click "Save Result" to archive.',
        view: 'step2',
      },
    ],
  },

  {
    id: 'review-result',
    title: 'Review a Saved Result',
    subtitle: 'Standard curve · QC panel · sample concentrations',
    description: 'Jump directly into a completed result record. Explore the fitted standard curve, assay quality checks, acceptance criteria pass/fail, and the full sample concentration table.',
    tags: ['Result detail', 'Histamine ELISA', 'Chart & QC', 'Out-of-range flags'],
    roles: 'QA Director, Lab Manager',
    time: '3 min',
    color: '#233447',
    icon: '📊',
    steps: [
      {
        title: 'Results Table',
        description: 'All completed quantification runs are archived here with search, filter, and pagination. The table shows assay type, lot number, operator, sample count, quantification rate, and any out-of-range flags.',
        view: 'results',
      },
      {
        title: 'Result Overview & COA Snapshot',
        description: 'Each saved result carries a complete snapshot: the assay and kit used, imported COA values (lot, expiry, plate lot), quantification rate, and flags. This record is fully self-contained — no re-entry required to reconstruct it.',
        view: 'detail',
        setResultId: 'AQ-24018',
      },
      {
        title: 'Standard Curve & Chart',
        description: 'The standard curve table shows raw OD duplicates, B/B₀ values, and fitted concentrations alongside COA reference ODs. The chart visualises the quadratic regression fit — the fitted line should pass closely through all six standard points.',
        view: 'detail',
        setResultId: 'AQ-24018',
      },
      {
        title: 'Assay QC & Acceptance Criteria',
        description: 'Four QC checks (blank OD, signal range, monotonicity, R²) and four acceptance criteria are evaluated automatically at save time. Each is scored pass/fail with the computed value shown — no manual calculation required.',
        view: 'detail',
        setResultId: 'AQ-24018',
      },
      {
        title: 'Sample Concentration Table',
        description: 'The full sample table with OD readings, B/B₀ values, assay concentrations, dilution factors, final sample concentrations, and range classification. Out-of-range samples are flagged — Sauce Base C (> ULoQ) and Process Blank (< LoQ).',
        view: 'detail',
        setResultId: 'AQ-24018',
      },
    ],
  },
]
