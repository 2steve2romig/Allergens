export const initialCoaFields = [
  { key: 'product',       label: 'Product',          value: 'AlerTox ELISA Histamine (96 tests)', required: true, type: 'text' },
  { key: 'catalogNo',     label: 'Catalog Number',   value: 'KIT3065',                            required: true, type: 'text' },
  { key: 'lot',           label: 'Lot',              value: '307626',                             required: true, type: 'text' },
  { key: 'expiryDate',    label: 'Expiry Date',      value: '2027-01-14',                         required: true, type: 'date' },
  { key: 'plateLot',      label: 'Plate Lot',        value: 'HI3-144',                            required: true, type: 'text' },
  { key: 'coaDate',       label: 'COA Date',         value: '2026-02-13',                         required: true, type: 'date' },
  { key: 'curveGeometry', label: 'Curve Geometry',   value: '4 Point method',                     required: true, type: 'text' },
]

// Histamine (competitive) — M. Chen — 8 samples, 6/8 quantifiable
const quant_24018 = {
  allergenId: 'histamine',
  operator: 'M. Chen',
  assayDate: '2026-04-08',
  assayDescription: 'Histamine ELISA verification — sauce base release, Lot 307612',
  standardCurve: [
    { od1: 1.954, od2: 1.961 },
    { od1: 1.489, od2: 1.494 },
    { od1: 0.998, od2: 1.004 },
    { od1: 0.745, od2: 0.739 },
    { od1: 0.513, od2: 0.509 },
    { od1: 0.383, od2: 0.378 },
  ],
  samples: [
    { name: 'Sauce Base A',    od1: 0.874, od2: 0.869, dilution: 1 },
    { name: 'Sauce Base B',    od1: 0.654, od2: 0.649, dilution: 1 },
    { name: 'Sauce Base C',    od1: 0.302, od2: 0.296, dilution: 1 },
    { name: 'Sauce Base D',    od1: 0.993, od2: 0.987, dilution: 1 },
    { name: 'Sauce Base E',    od1: 1.618, od2: 1.624, dilution: 1 },
    { name: 'Fermented Stock', od1: 0.741, od2: 0.747, dilution: 5 },
    { name: 'Aged Mash',       od1: 0.449, od2: 0.443, dilution: 5 },
    { name: 'Brine Extract',   od1: 0.557, od2: 0.563, dilution: 1 },
  ],
}

// Histamine (competitive) — A. Patel — 5 samples, 5/5 quantifiable
const quant_24017 = {
  allergenId: 'histamine',
  operator: 'A. Patel',
  assayDate: '2026-04-05',
  assayDescription: 'Histamine ELISA — incoming ingredient verification, Lot 307598',
  standardCurve: [
    { od1: 2.011, od2: 2.007 },
    { od1: 1.543, od2: 1.549 },
    { od1: 1.023, od2: 1.017 },
    { od1: 0.768, od2: 0.774 },
    { od1: 0.532, od2: 0.526 },
    { od1: 0.396, od2: 0.401 },
  ],
  samples: [
    { name: 'Tuna Paste Lot A',  od1: 0.834, od2: 0.828, dilution: 1 },
    { name: 'Tuna Paste Lot B',  od1: 1.102, od2: 1.097, dilution: 1 },
    { name: 'Anchovy Extract',   od1: 0.698, od2: 0.703, dilution: 5 },
    { name: 'Sardine Slurry',    od1: 0.612, od2: 0.606, dilution: 5 },
    { name: 'Process Blank',     od1: 0.488, od2: 0.493, dilution: 1 },
  ],
}

// Milk (sandwich) — R. Ortiz — 7 samples, 7/7 quantifiable
const quant_24016 = {
  allergenId: 'milk',
  operator: 'R. Ortiz',
  assayDate: '2026-04-02',
  assayDescription: 'Milk residue ELISA — CIP validation post-allergen changeover, Lot 221144',
  standardCurve: [
    { od1: 0.081, od2: 0.079 },
    { od1: 0.267, od2: 0.271 },
    { od1: 0.673, od2: 0.669 },
    { od1: 1.487, od2: 1.493 },
    { od1: 2.341, od2: 2.337 },
  ],
  samples: [
    { name: 'Rinse Water 1', od1: 0.412, od2: 0.408, dilution: 1 },
    { name: 'Rinse Water 2', od1: 0.958, od2: 0.963, dilution: 1 },
    { name: 'Swab — Line A', od1: 1.234, od2: 1.228, dilution: 1 },
    { name: 'Swab — Line B', od1: 0.534, od2: 0.531, dilution: 1 },
    { name: 'Swab — Filler', od1: 1.756, od2: 1.762, dilution: 1 },
    { name: 'Tank Drain',    od1: 0.673, od2: 0.668, dilution: 1 },
    { name: 'Process Blank', od1: 1.102, od2: 1.098, dilution: 1 },
  ],
}

export const initialResults = [
  {
    id: 'AQ-24018', date: '2026-04-08', assay: 'Histamine ELISA',
    lot: '307612', operator: 'M. Chen',  sampleCount: 8,
    quantifiable: '6 / 8', flags: '2 outside RoQ', status: 'Completed',
    product: 'AlerTox ELISA Histamine', kit: 'KIT3065',
    notes: 'One sample above ULoQ, one below LoQ.',
    resultSamples: [],
    savedQuant: quant_24018,
  },
  {
    id: 'AQ-24017', date: '2026-04-05', assay: 'Histamine ELISA',
    lot: '307598', operator: 'A. Patel', sampleCount: 5,
    quantifiable: '5 / 5', flags: 'None', status: 'Completed',
    product: 'AlerTox ELISA Histamine', kit: 'KIT3065',
    notes: 'All samples within quantification range.',
    resultSamples: [],
    savedQuant: quant_24017,
  },
  {
    id: 'AQ-24016', date: '2026-04-02', assay: 'Milk Residue ELISA',
    lot: '221144', operator: 'R. Ortiz', sampleCount: 7,
    quantifiable: '7 / 7', flags: 'None', status: 'Completed',
    product: 'AlerTox ELISA Milk', kit: 'KIT3122',
    notes: 'Routine CIP verification run completed.',
    resultSamples: [],
    savedQuant: quant_24016,
  },
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
