// Mock data for diabetes tablets
const drugs = [
  {
    name: 'Metformin',
    combination: 'Metformin Hydrochloride',
    manufacturer: 'Sun Pharma',
    price: 40,
    alternatives: ['Glycomet', 'Bigomet', 'Obimet']
  },
  {
    name: 'Glycomet',
    combination: 'Metformin Hydrochloride',
    manufacturer: 'USV Ltd',
    price: 35,
    alternatives: ['Metformin', 'Bigomet', 'Obimet']
  },
  {
    name: 'Bigomet',
    combination: 'Metformin Hydrochloride',
    manufacturer: 'Aristo Pharma',
    price: 38,
    alternatives: ['Metformin', 'Glycomet', 'Obimet']
  },
  {
    name: 'Obimet',
    combination: 'Metformin Hydrochloride',
    manufacturer: 'Abbott',
    price: 42,
    alternatives: ['Metformin', 'Glycomet', 'Bigomet']
  },
  {
    name: 'Janumet',
    combination: 'Sitagliptin + Metformin',
    manufacturer: 'MSD',
    price: 180,
    alternatives: ['Istamet', 'Glycomet GP']
  },
  {
    name: 'Istamet',
    combination: 'Sitagliptin + Metformin',
    manufacturer: 'Sun Pharma',
    price: 170,
    alternatives: ['Janumet', 'Glycomet GP']
  },
  {
    name: 'Glycomet GP',
    combination: 'Glimepiride + Metformin',
    manufacturer: 'USV Ltd',
    price: 60,
    alternatives: ['Janumet', 'Istamet']
  },
  {
    name: 'Glimepiride',
    combination: 'Glimepiride',
    manufacturer: 'Torrent',
    price: 45,
    alternatives: ['Amaryl', 'Diamicron']
  },
  {
    name: 'Amaryl',
    combination: 'Glimepiride',
    manufacturer: 'Sanofi',
    price: 50,
    alternatives: ['Glimepiride', 'Diamicron']
  },
  {
    name: 'Diamicron',
    combination: 'Gliclazide',
    manufacturer: 'Servier',
    price: 55,
    alternatives: ['Glimepiride', 'Amaryl']
  },
  {
    name: 'Pioglitazone',
    combination: 'Pioglitazone Hydrochloride',
    manufacturer: 'Lupin',
    price: 70,
    alternatives: ['Actos', 'Piozone']
  },
  {
    name: 'Actos',
    combination: 'Pioglitazone Hydrochloride',
    manufacturer: 'Takeda',
    price: 75,
    alternatives: ['Pioglitazone', 'Piozone']
  },
  {
    name: 'Piozone',
    combination: 'Pioglitazone Hydrochloride',
    manufacturer: 'Zydus',
    price: 65,
    alternatives: ['Pioglitazone', 'Actos']
  },
  {
    name: 'Startglim',
    combination: 'Glimepiride + Metformin',
    manufacturer: 'USV Ltd',
    price: 55,
    alternatives: ['Glycomet GP', 'Janumet']
  },
  {
    name: 'Dapa',
    combination: 'Dapagliflozin',
    manufacturer: 'AstraZeneca',
    price: 120,
    alternatives: ['Forxiga', 'Jardiance']
  }
];

export default drugs; 