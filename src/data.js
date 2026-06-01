export const initialCoaFields = [
  { key: 'product',       label: 'Product',          value: 'AlerTox ELISA Histamine (96 tests)', required: true, type: 'text' },
  { key: 'catalogNo',     label: 'Catalog Number',   value: 'KIT3065',                            required: true, type: 'text' },
  { key: 'lot',           label: 'Lot',              value: '307626',                             required: true, type: 'text' },
  { key: 'expiryDate',    label: 'Expiry Date',      value: '2027-01-14',                         required: true, type: 'date' },
  { key: 'plateLot',      label: 'Plate Lot',        value: 'HI3-144',                            required: true, type: 'text' },
  { key: 'coaDate',       label: 'COA Date',         value: '2026-02-13',                         required: true, type: 'date' },
  { key: 'curveGeometry', label: 'Curve Geometry',   value: '4 Point method',                     required: true, type: 'text' },
]

export const initialResults = [
  { id: 'AQ-24018', date: '2026-04-08', assay: 'Histamine ELISA',    lot: '307612', operator: 'M. Chen',  sampleCount: 8, quantifiable: '6 / 8', flags: '2 outside RoQ', status: 'Completed', product: 'AlerTox ELISA Histamine', kit: 'KIT3065', notes: 'One sample above ULoQ, one below LoQ.',           resultSamples: [] },
  { id: 'AQ-24017', date: '2026-04-05', assay: 'Histamine ELISA',    lot: '307598', operator: 'A. Patel', sampleCount: 5, quantifiable: '5 / 5', flags: 'None',          status: 'Completed', product: 'AlerTox ELISA Histamine', kit: 'KIT3065', notes: 'All samples within quantification range.',         resultSamples: [] },
  { id: 'AQ-24016', date: '2026-04-02', assay: 'Milk Residue ELISA', lot: '221144', operator: 'R. Ortiz', sampleCount: 7, quantifiable: '7 / 7', flags: 'None',          status: 'Completed', product: 'AlerTox ELISA Milk',     kit: 'KIT3122', notes: 'Routine verification run completed.',            resultSamples: [] },
]

export const initialQuant = {
  allergenId: 'histamine',
  operator: 'Steve Romig',
  assayDate: '2026-04-09',
  assayDescription: 'Histamine ELISA verification for sauce base release sample set',
  standardCurve: [
    { od1: 1.989, od2: 1.983 },
    { od1: 1.525, od2: 1.519 },
    { od1: 1.016, od2: 1.010 },
    { od1: 0.762, od2: 0.756 },
    { od1: 0.520, od2: 0.516 },
    { od1: 0.392, od2: 0.388 },
  ],
  samples: [
    { name: 'Sample A', od1: 0.884, od2: 0.879, dilution: 1 },
    { name: 'Sample B', od1: 0.454, od2: 0.448, dilution: 5 },
    { name: 'Sample C', od1: 1.712, od2: 1.701, dilution: 1 },
    { name: 'Sample D', od1: 0.214, od2: 0.209, dilution: 1 },
  ],
}
