export const coaDefaults = {
  product: 'AlerTox ELISA Histamine (96 tests)',
  catalogNo: 'KIT3065',
  lot: '307626',
  expiryDate: '2027-01-14',
  plateLot: 'HI3-144',
  coaDate: '2026-02-13',
  curveGeometry: '4 Point method',
  acceptance0: '0 ppm standard must be < 1 ppm',
  acceptance6: '6 ppm standard must be between 4.2 and 7.8 ppm',
  acceptance24: '24 ppm standard must be between 16.8 and 31.2 ppm',
  standards: [
    { std: '0', concentration: 0,  meanOD: 1.984, cv: 2.2, bb0: 100.0 },
    { std: '1', concentration: 2,  meanOD: 1.526, cv: 3.1, bb0: 76.9  },
    { std: '2', concentration: 6,  meanOD: 1.007, cv: 5.4, bb0: 50.8  },
    { std: '3', concentration: 12, meanOD: 0.761, cv: 7.0, bb0: 38.4  },
    { std: '4', concentration: 24, meanOD: 0.521, cv: 3.9, bb0: 26.3  },
    { std: '5', concentration: 72, meanOD: 0.390, cv: 3.6, bb0: 19.7  },
  ],
}

export const initialCoaFields = [
  { key: 'product',      label: 'Product',                  value: coaDefaults.product,      required: true, type: 'text' },
  { key: 'catalogNo',    label: 'Catalog Number',            value: coaDefaults.catalogNo,    required: true, type: 'text' },
  { key: 'lot',          label: 'Lot',                       value: coaDefaults.lot,          required: true, type: 'text' },
  { key: 'expiryDate',   label: 'Expiry Date',               value: coaDefaults.expiryDate,   required: true, type: 'date' },
  { key: 'plateLot',     label: 'Plate Lot',                 value: coaDefaults.plateLot,     required: true, type: 'text' },
  { key: 'coaDate',      label: 'COA Date',                  value: coaDefaults.coaDate,      required: true, type: 'date' },
  { key: 'curveGeometry',label: 'Curve Geometry',            value: coaDefaults.curveGeometry,required: true, type: 'text' },
  { key: 'acceptance0',  label: 'Acceptance Rule: Std 0',    value: coaDefaults.acceptance0,  required: true, type: 'text' },
  { key: 'acceptance6',  label: 'Acceptance Rule: Std 6',    value: coaDefaults.acceptance6,  required: true, type: 'text' },
  { key: 'acceptance24', label: 'Acceptance Rule: Std 24',   value: coaDefaults.acceptance24, required: true, type: 'text' },
]

export const initialResults = [
  { id: 'AQ-24018', date: '2026-04-08', assay: 'Histamine ELISA',    lot: '307612', operator: 'M. Chen',  sampleCount: 8, quantifiable: '6 / 8', flags: '2 outside RoQ', status: 'Completed', product: 'AlerTox ELISA Histamine', kit: 'KIT3065', notes: 'One sample above ULoQ, one below LoQ.', resultSamples: [] },
  { id: 'AQ-24017', date: '2026-04-05', assay: 'Histamine ELISA',    lot: '307598', operator: 'A. Patel', sampleCount: 5, quantifiable: '5 / 5', flags: 'None',          status: 'Completed', product: 'AlerTox ELISA Histamine', kit: 'KIT3065', notes: 'All samples within quantification range.', resultSamples: [] },
  { id: 'AQ-24016', date: '2026-04-02', assay: 'Milk Residue ELISA', lot: '221144', operator: 'R. Ortiz', sampleCount: 7, quantifiable: '7 / 7', flags: 'None',          status: 'Completed', product: 'AlerTox ELISA Milk',     kit: 'KIT3122', notes: 'Routine verification run completed.', resultSamples: [] },
]

export const initialQuant = {
  operator: 'Steve Romig',
  assayDate: '2026-04-09',
  assayDescription: 'Histamine ELISA verification for sauce base release sample set',
  standardCurve: [1.986, 1.522, 1.013, 0.759, 0.518],
  samples: [
    { name: 'Sample A', od1: 0.884, od2: 0.879, dilution: 1 },
    { name: 'Sample B', od1: 0.454, od2: 0.448, dilution: 5 },
    { name: 'Sample C', od1: 1.712, od2: 1.701, dilution: 1 },
    { name: 'Sample D', od1: 0.214, od2: 0.209, dilution: 1 },
  ],
}
