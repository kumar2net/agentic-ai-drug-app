// Mock data for diabetes tablets
const drugs = [
  {
    name: 'Metformin',
    combination: 'Metformin Hydrochloride',
    manufacturer: 'Sun Pharma',
    price: 40,
    strength: '500mg',
    dosageForm: 'Tablet',
    sideEffects: ['Nausea', 'Diarrhea', 'Vitamin B12 deficiency'],
    alternatives: ['Glycomet', 'Bigomet', 'Obimet', 'Glucophage'],
    category: 'Biguanide'
  },
  {
    name: 'Glycomet',
    combination: 'Metformin Hydrochloride',
    manufacturer: 'USV Ltd',
    price: 35,
    strength: '500mg',
    dosageForm: 'Tablet',
    sideEffects: ['Nausea', 'Diarrhea', 'Vitamin B12 deficiency'],
    alternatives: ['Metformin', 'Bigomet', 'Obimet', 'Glucophage'],
    category: 'Biguanide'
  },
  {
    name: 'Bigomet',
    combination: 'Metformin Hydrochloride',
    manufacturer: 'Aristo Pharma',
    price: 38,
    strength: '500mg',
    dosageForm: 'Tablet',
    sideEffects: ['Nausea', 'Diarrhea', 'Vitamin B12 deficiency'],
    alternatives: ['Metformin', 'Glycomet', 'Obimet', 'Glucophage'],
    category: 'Biguanide'
  },
  {
    name: 'Obimet',
    combination: 'Metformin Hydrochloride',
    manufacturer: 'Abbott',
    price: 42,
    strength: '500mg',
    dosageForm: 'Tablet',
    sideEffects: ['Nausea', 'Diarrhea', 'Vitamin B12 deficiency'],
    alternatives: ['Metformin', 'Glycomet', 'Bigomet', 'Glucophage'],
    category: 'Biguanide'
  },
  {
    name: 'Janumet',
    combination: 'Sitagliptin + Metformin',
    manufacturer: 'MSD',
    price: 180,
    strength: '50mg/500mg',
    dosageForm: 'Tablet',
    sideEffects: ['Upper respiratory infection', 'Headache', 'Nausea'],
    alternatives: ['Istamet', 'Glycomet GP', 'Vildagliptin + Metformin'],
    category: 'DPP-4 Inhibitor + Biguanide'
  },
  {
    name: 'Istamet',
    combination: 'Sitagliptin + Metformin',
    manufacturer: 'Sun Pharma',
    price: 170,
    strength: '50mg/500mg',
    dosageForm: 'Tablet',
    sideEffects: ['Upper respiratory infection', 'Headache', 'Nausea'],
    alternatives: ['Janumet', 'Glycomet GP', 'Vildagliptin + Metformin'],
    category: 'DPP-4 Inhibitor + Biguanide'
  },
  {
    name: 'Glycomet GP',
    combination: 'Glimepiride + Metformin',
    manufacturer: 'USV Ltd',
    price: 60,
    strength: '1mg/500mg',
    dosageForm: 'Tablet',
    sideEffects: ['Hypoglycemia', 'Weight gain', 'Nausea'],
    alternatives: ['Janumet', 'Istamet', 'Amaryl M'],
    category: 'Sulfonylurea + Biguanide'
  },
  {
    name: 'Glimepiride',
    combination: 'Glimepiride',
    manufacturer: 'Torrent',
    price: 45,
    strength: '1mg',
    dosageForm: 'Tablet',
    sideEffects: ['Hypoglycemia', 'Weight gain', 'Skin reactions'],
    alternatives: ['Amaryl', 'Diamicron', 'Gliclazide'],
    category: 'Sulfonylurea'
  },
  {
    name: 'Amaryl',
    combination: 'Glimepiride',
    manufacturer: 'Sanofi',
    price: 50,
    strength: '1mg',
    dosageForm: 'Tablet',
    sideEffects: ['Hypoglycemia', 'Weight gain', 'Skin reactions'],
    alternatives: ['Glimepiride', 'Diamicron', 'Gliclazide'],
    category: 'Sulfonylurea'
  },
  {
    name: 'Diamicron',
    combination: 'Gliclazide',
    manufacturer: 'Servier',
    price: 55,
    strength: '30mg',
    dosageForm: 'Tablet',
    sideEffects: ['Hypoglycemia', 'Weight gain', 'Gastrointestinal disturbances'],
    alternatives: ['Glimepiride', 'Amaryl', 'Gliclazide'],
    category: 'Sulfonylurea'
  },
  {
    name: 'Pioglitazone',
    combination: 'Pioglitazone Hydrochloride',
    manufacturer: 'Lupin',
    price: 70,
    strength: '15mg',
    dosageForm: 'Tablet',
    sideEffects: ['Weight gain', 'Edema', 'Fracture risk'],
    alternatives: ['Actos', 'Piozone', 'Pioglitazone + Metformin'],
    category: 'Thiazolidinedione'
  },
  {
    name: 'Actos',
    combination: 'Pioglitazone Hydrochloride',
    manufacturer: 'Takeda',
    price: 75,
    strength: '15mg',
    dosageForm: 'Tablet',
    sideEffects: ['Weight gain', 'Edema', 'Fracture risk'],
    alternatives: ['Pioglitazone', 'Piozone', 'Pioglitazone + Metformin'],
    category: 'Thiazolidinedione'
  },
  {
    name: 'Piozone',
    combination: 'Pioglitazone Hydrochloride',
    manufacturer: 'Zydus',
    price: 65,
    strength: '15mg',
    dosageForm: 'Tablet',
    sideEffects: ['Weight gain', 'Edema', 'Fracture risk'],
    alternatives: ['Pioglitazone', 'Actos', 'Pioglitazone + Metformin'],
    category: 'Thiazolidinedione'
  },
  {
    name: 'Startglim',
    combination: 'Glimepiride + Metformin',
    manufacturer: 'USV Ltd',
    price: 55,
    strength: '1mg/500mg',
    dosageForm: 'Tablet',
    sideEffects: ['Hypoglycemia', 'Weight gain', 'Nausea'],
    alternatives: ['Glycomet GP', 'Janumet', 'Amaryl M'],
    category: 'Sulfonylurea + Biguanide'
  },
  {
    name: 'Dapa',
    combination: 'Dapagliflozin',
    manufacturer: 'AstraZeneca',
    price: 120,
    strength: '10mg',
    dosageForm: 'Tablet',
    sideEffects: ['UTI', 'Dehydration', 'Ketoacidosis'],
    alternatives: ['Forxiga', 'Jardiance', 'Empagliflozin'],
    category: 'SGLT2 Inhibitor'
  },
  {
    name: 'Forxiga',
    combination: 'Dapagliflozin',
    manufacturer: 'AstraZeneca',
    price: 125,
    strength: '10mg',
    dosageForm: 'Tablet',
    sideEffects: ['UTI', 'Dehydration', 'Ketoacidosis'],
    alternatives: ['Dapa', 'Jardiance', 'Empagliflozin'],
    category: 'SGLT2 Inhibitor'
  },
  {
    name: 'Jardiance',
    combination: 'Empagliflozin',
    manufacturer: 'Boehringer Ingelheim',
    price: 130,
    strength: '10mg',
    dosageForm: 'Tablet',
    sideEffects: ['UTI', 'Dehydration', 'Ketoacidosis'],
    alternatives: ['Dapa', 'Forxiga', 'Empagliflozin'],
    category: 'SGLT2 Inhibitor'
  },
  {
    name: 'Galvus',
    combination: 'Vildagliptin',
    manufacturer: 'Novartis',
    price: 140,
    strength: '50mg',
    dosageForm: 'Tablet',
    sideEffects: ['Headache', 'Dizziness', 'Upper respiratory infection'],
    alternatives: ['Januvia', 'Onglyza', 'Tradjenta'],
    category: 'DPP-4 Inhibitor'
  },
  {
    name: 'Januvia',
    combination: 'Sitagliptin',
    manufacturer: 'MSD',
    price: 145,
    strength: '100mg',
    dosageForm: 'Tablet',
    sideEffects: ['Headache', 'Dizziness', 'Upper respiratory infection'],
    alternatives: ['Galvus', 'Onglyza', 'Tradjenta'],
    category: 'DPP-4 Inhibitor'
  }
];

export default drugs; 