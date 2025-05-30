// Mock data for diabetes tablets
const drugs = [
  {
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: 50,
    combination: "Paracetamol",
    strength: "500mg",
    dosageForm: "Tablet",
    manufacturer: "Sun Pharma",
    sideEffects: ["Nausea", "Liver problems in high doses", "Allergic reactions"],
    alternatives: ["Dolo 650", "Crocin", "Calpol"]
  },
  {
    name: "Dolo 650",
    category: "Pain Relief",
    price: 45,
    combination: "Paracetamol",
    strength: "650mg",
    dosageForm: "Tablet",
    manufacturer: "Micro Labs",
    sideEffects: ["Nausea", "Liver problems in high doses", "Allergic reactions"],
    alternatives: ["Paracetamol 500mg", "Crocin", "Calpol"]
  },
  {
    name: "Azithromycin 500mg",
    category: "Antibiotics",
    price: 120,
    combination: "Azithromycin",
    strength: "500mg",
    dosageForm: "Tablet",
    manufacturer: "Cipla",
    sideEffects: ["Diarrhea", "Nausea", "Abdominal pain"],
    alternatives: ["Zithromax", "Zithral", "Azee"]
  },
  {
    name: "Metformin 500mg",
    category: "Diabetes",
    price: 80,
    combination: "Metformin",
    strength: "500mg",
    dosageForm: "Tablet",
    manufacturer: "USV Ltd",
    sideEffects: ["Nausea", "Diarrhea", "Vitamin B12 deficiency"],
    alternatives: ["Glycomet", "Glucophage", "Metlong"]
  },
  {
    name: "Amlodipine 5mg",
    category: "Hypertension",
    price: 95,
    combination: "Amlodipine",
    strength: "5mg",
    dosageForm: "Tablet",
    manufacturer: "MSD",
    sideEffects: ["Swelling in ankles", "Headache", "Dizziness"],
    alternatives: ["Amlong", "Amlovas", "Stamlo"]
  },
  {
    name: "Omeprazole 20mg",
    category: "Gastrointestinal",
    price: 110,
    combination: "Omeprazole",
    strength: "20mg",
    dosageForm: "Capsule",
    manufacturer: "Sun Pharma",
    sideEffects: ["Headache", "Diarrhea", "Abdominal pain"],
    alternatives: ["Pantoprazole", "Esomeprazole", "Rabeprazole"]
  },
  {
    name: "Cetirizine 10mg",
    category: "Antiallergic",
    price: 65,
    combination: "Cetirizine",
    strength: "10mg",
    dosageForm: "Tablet",
    manufacturer: "USV Ltd",
    sideEffects: ["Drowsiness", "Dry mouth", "Headache"],
    alternatives: ["Levocet", "Alerid", "Zyrtec"]
  },
  {
    name: "Atorvastatin 20mg",
    category: "Cardiovascular",
    price: 150,
    combination: "Atorvastatin",
    strength: "20mg",
    dosageForm: "Tablet",
    manufacturer: "Cipla",
    sideEffects: ["Muscle pain", "Liver problems", "Digestive issues"],
    alternatives: ["Lipitor", "Atorva", "Torvacard"]
  },
  // Additional Pain Relief drugs
  {
    name: "Ibuprofen 400mg",
    category: "Pain Relief",
    price: 55,
    combination: "Ibuprofen",
    strength: "400mg",
    dosageForm: "Tablet",
    manufacturer: "Cipla",
    sideEffects: ["Stomach pain", "Heartburn", "Dizziness"],
    alternatives: ["Brufen", "Advil", "Nurofen"]
  },
  {
    name: "Diclofenac 50mg",
    category: "Pain Relief",
    price: 60,
    combination: "Diclofenac",
    strength: "50mg",
    dosageForm: "Tablet",
    manufacturer: "Novartis",
    sideEffects: ["Stomach ulcers", "Kidney problems", "High blood pressure"],
    alternatives: ["Voveran", "Cataflam", "Voltaren"]
  },
  {
    name: "Naproxen 500mg",
    category: "Pain Relief",
    price: 75,
    combination: "Naproxen",
    strength: "500mg",
    dosageForm: "Tablet",
    manufacturer: "Sun Pharma",
    sideEffects: ["Stomach pain", "Heartburn", "Drowsiness"],
    alternatives: ["Naprosyn", "Aleve", "Anaprox"]
  },
  {
    name: "Aspirin 75mg",
    category: "Pain Relief",
    price: 40,
    combination: "Aspirin",
    strength: "75mg",
    dosageForm: "Tablet",
    manufacturer: "Bayer",
    sideEffects: ["Stomach bleeding", "Allergic reactions", "Ringing in ears"],
    alternatives: ["Ecosprin", "Disprin", "Aspilet"]
  },
  {
    name: "Tramadol 50mg",
    category: "Pain Relief",
    price: 85,
    combination: "Tramadol",
    strength: "50mg",
    dosageForm: "Capsule",
    manufacturer: "Cipla",
    sideEffects: ["Dizziness", "Nausea", "Constipation"],
    alternatives: ["Ultram", "Tramal", "Contramal"]
  },
  // Additional Antibiotics
  {
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    price: 100,
    combination: "Amoxicillin",
    strength: "500mg",
    dosageForm: "Capsule",
    manufacturer: "Cipla",
    sideEffects: ["Diarrhea", "Rash", "Allergic reactions"],
    alternatives: ["Novamox", "Amoxil", "Trimox"]
  },
  {
    name: "Ciprofloxacin 500mg",
    category: "Antibiotics",
    price: 130,
    combination: "Ciprofloxacin",
    strength: "500mg",
    dosageForm: "Tablet",
    manufacturer: "Bayer",
    sideEffects: ["Tendon rupture", "Nausea", "Diarrhea"],
    alternatives: ["Ciplox", "Cipro", "Ciprobay"]
  },
  {
    name: "Doxycycline 100mg",
    category: "Antibiotics",
    price: 110,
    combination: "Doxycycline",
    strength: "100mg",
    dosageForm: "Capsule",
    manufacturer: "Pfizer",
    sideEffects: ["Photosensitivity", "Nausea", "Esophageal irritation"],
    alternatives: ["Vibramycin", "Doxy", "Monodox"]
  },
  {
    name: "Clarithromycin 500mg",
    category: "Antibiotics",
    price: 140,
    combination: "Clarithromycin",
    strength: "500mg",
    dosageForm: "Tablet",
    manufacturer: "Abbott",
    sideEffects: ["Diarrhea", "Nausea", "Abnormal taste"],
    alternatives: ["Biaxin", "Klaricid", "Claribid"]
  },
  {
    name: "Metronidazole 400mg",
    category: "Antibiotics",
    price: 90,
    combination: "Metronidazole",
    strength: "400mg",
    dosageForm: "Tablet",
    manufacturer: "Sun Pharma",
    sideEffects: ["Metallic taste", "Nausea", "Dark urine"],
    alternatives: ["Flagyl", "Metrogyl", "Nidazol"]
  },
  // Additional Diabetes drugs
  {
    name: "Glimepiride 2mg",
    category: "Diabetes",
    price: 85,
    combination: "Glimepiride",
    strength: "2mg",
    dosageForm: "Tablet",
    manufacturer: "Sanofi",
    sideEffects: ["Hypoglycemia", "Weight gain", "Nausea"],
    alternatives: ["Amaryl", "Glimepiride", "Glimestar"]
  },
  {
    name: "Sitagliptin 100mg",
    category: "Diabetes",
    price: 180,
    combination: "Sitagliptin",
    strength: "100mg",
    dosageForm: "Tablet",
    manufacturer: "Merck",
    sideEffects: ["Upper respiratory infection", "Headache", "Joint pain"],
    alternatives: ["Januvia", "Xelevia", "Istavel"]
  },
  {
    name: "Empagliflozin 25mg",
    category: "Diabetes",
    price: 200,
    combination: "Empagliflozin",
    strength: "25mg",
    dosageForm: "Tablet",
    manufacturer: "Boehringer",
    sideEffects: ["UTI", "Dehydration", "Ketoacidosis"],
    alternatives: ["Jardiance", "Glyxambi", "Synjardy"]
  },
  {
    name: "Pioglitazone 15mg",
    category: "Diabetes",
    price: 120,
    combination: "Pioglitazone",
    strength: "15mg",
    dosageForm: "Tablet",
    manufacturer: "Takeda",
    sideEffects: ["Weight gain", "Edema", "Fracture risk"],
    alternatives: ["Actos", "Pioz", "Piozone"]
  },
  {
    name: "Repaglinide 2mg",
    category: "Diabetes",
    price: 95,
    combination: "Repaglinide",
    strength: "2mg",
    dosageForm: "Tablet",
    manufacturer: "Novo Nordisk",
    sideEffects: ["Hypoglycemia", "Weight gain", "Upper respiratory infection"],
    alternatives: ["Prandin", "Novonorm", "Encil"]
  },
  // Additional Hypertension drugs
  {
    name: "Losartan 50mg",
    category: "Hypertension",
    price: 100,
    combination: "Losartan",
    strength: "50mg",
    dosageForm: "Tablet",
    manufacturer: "MSD",
    sideEffects: ["Dizziness", "Back pain", "Cough"],
    alternatives: ["Cozaar", "Losartan", "Repace"]
  },
  {
    name: "Atenolol 50mg",
    category: "Hypertension",
    price: 85,
    combination: "Atenolol",
    strength: "50mg",
    dosageForm: "Tablet",
    manufacturer: "Cipla",
    sideEffects: ["Fatigue", "Cold extremities", "Depression"],
    alternatives: ["Tenormin", "Aten", "Betacard"]
  },
  {
    name: "Hydrochlorothiazide 25mg",
    category: "Hypertension",
    price: 70,
    combination: "Hydrochlorothiazide",
    strength: "25mg",
    dosageForm: "Tablet",
    manufacturer: "Sun Pharma",
    sideEffects: ["Frequent urination", "Electrolyte imbalance", "Gout"],
    alternatives: ["Esidrix", "Hydrodiuril", "Microzide"]
  },
  {
    name: "Valsartan 160mg",
    category: "Hypertension",
    price: 110,
    combination: "Valsartan",
    strength: "160mg",
    dosageForm: "Tablet",
    manufacturer: "Novartis",
    sideEffects: ["Dizziness", "Diarrhea", "Back pain"],
    alternatives: ["Diovan", "Valzaar", "Valent"]
  },
  {
    name: "Carvedilol 25mg",
    category: "Hypertension",
    price: 95,
    combination: "Carvedilol",
    strength: "25mg",
    dosageForm: "Tablet",
    manufacturer: "GSK",
    sideEffects: ["Dizziness", "Fatigue", "Weight gain"],
    alternatives: ["Coreg", "Carvedilol", "Cardivas"]
  },
  // Additional Gastrointestinal drugs
  {
    name: "Ranitidine 150mg",
    category: "Gastrointestinal",
    price: 90,
    combination: "Ranitidine",
    strength: "150mg",
    dosageForm: "Tablet",
    manufacturer: "GSK",
    sideEffects: ["Headache", "Constipation", "Diarrhea"],
    alternatives: ["Zantac", "Rantac", "Zinetac"]
  },
  {
    name: "Domperidone 10mg",
    category: "Gastrointestinal",
    price: 75,
    combination: "Domperidone",
    strength: "10mg",
    dosageForm: "Tablet",
    manufacturer: "Janssen",
    sideEffects: ["Headache", "Dry mouth", "Dizziness"],
    alternatives: ["Motilium", "Domstal", "Peridys"]
  },
  {
    name: "Lansoprazole 30mg",
    category: "Gastrointestinal",
    price: 120,
    combination: "Lansoprazole",
    strength: "30mg",
    dosageForm: "Capsule",
    manufacturer: "Takeda",
    sideEffects: ["Headache", "Diarrhea", "Abdominal pain"],
    alternatives: ["Prevacid", "Lanso", "Lanzol"]
  },
  {
    name: "Metoclopramide 10mg",
    category: "Gastrointestinal",
    price: 65,
    combination: "Metoclopramide",
    strength: "10mg",
    dosageForm: "Tablet",
    manufacturer: "Sanofi",
    sideEffects: ["Drowsiness", "Restlessness", "Extrapyramidal symptoms"],
    alternatives: ["Reglan", "Maxolon", "Perinorm"]
  },
  {
    name: "Sucralfate 1g",
    category: "Gastrointestinal",
    price: 85,
    combination: "Sucralfate",
    strength: "1g",
    dosageForm: "Tablet",
    manufacturer: "Aventis",
    sideEffects: ["Constipation", "Dry mouth", "Back pain"],
    alternatives: ["Carafate", "Sucral", "Sucrafil"]
  },
  // Additional Antiallergic drugs
  {
    name: "Levocetirizine 5mg",
    category: "Antiallergic",
    price: 70,
    combination: "Levocetirizine",
    strength: "5mg",
    dosageForm: "Tablet",
    manufacturer: "UCB",
    sideEffects: ["Drowsiness", "Headache", "Dry mouth"],
    alternatives: ["Xyzal", "Levocet", "Xyzal"]
  },
  {
    name: "Fexofenadine 120mg",
    category: "Antiallergic",
    price: 85,
    combination: "Fexofenadine",
    strength: "120mg",
    dosageForm: "Tablet",
    manufacturer: "Sanofi",
    sideEffects: ["Headache", "Drowsiness", "Nausea"],
    alternatives: ["Allegra", "Telfast", "Fexo"]
  },
  {
    name: "Desloratadine 5mg",
    category: "Antiallergic",
    price: 90,
    combination: "Desloratadine",
    strength: "5mg",
    dosageForm: "Tablet",
    manufacturer: "MSD",
    sideEffects: ["Headache", "Dry mouth", "Fatigue"],
    alternatives: ["Clarinex", "Aerius", "Deslor"]
  },
  {
    name: "Bilastine 20mg",
    category: "Antiallergic",
    price: 95,
    combination: "Bilastine",
    strength: "20mg",
    dosageForm: "Tablet",
    manufacturer: "FAES",
    sideEffects: ["Headache", "Drowsiness", "Fatigue"],
    alternatives: ["Bilaxten", "Ilaxten", "Bilaska"]
  },
  {
    name: "Rupatadine 10mg",
    category: "Antiallergic",
    price: 100,
    combination: "Rupatadine",
    strength: "10mg",
    dosageForm: "Tablet",
    manufacturer: "J Uriach",
    sideEffects: ["Headache", "Drowsiness", "Fatigue"],
    alternatives: ["Rupafin", "Rupall", "Rupatadine"]
  },
  // Additional Cardiovascular drugs
  {
    name: "Clopidogrel 75mg",
    category: "Cardiovascular",
    price: 130,
    combination: "Clopidogrel",
    strength: "75mg",
    dosageForm: "Tablet",
    manufacturer: "Sanofi",
    sideEffects: ["Bleeding", "Headache", "Dizziness"],
    alternatives: ["Plavix", "Clopilet", "Clopidogrel"]
  },
  {
    name: "Metoprolol 50mg",
    category: "Cardiovascular",
    price: 95,
    combination: "Metoprolol",
    strength: "50mg",
    dosageForm: "Tablet",
    manufacturer: "AstraZeneca",
    sideEffects: ["Fatigue", "Dizziness", "Depression"],
    alternatives: ["Lopressor", "Toprol", "Metolar"]
  },
  {
    name: "Ramipril 5mg",
    category: "Cardiovascular",
    price: 110,
    combination: "Ramipril",
    strength: "5mg",
    dosageForm: "Tablet",
    manufacturer: "Sanofi",
    sideEffects: ["Cough", "Dizziness", "Headache"],
    alternatives: ["Altace", "Ramace", "Tritace"]
  },
  {
    name: "Diltiazem 90mg",
    category: "Cardiovascular",
    price: 100,
    combination: "Diltiazem",
    strength: "90mg",
    dosageForm: "Capsule",
    manufacturer: "Abbott",
    sideEffects: ["Headache", "Dizziness", "Edema"],
    alternatives: ["Cardizem", "Dilzem", "Tiazac"]
  },
  {
    name: "Isosorbide 20mg",
    category: "Cardiovascular",
    price: 85,
    combination: "Isosorbide",
    strength: "20mg",
    dosageForm: "Tablet",
    manufacturer: "Pfizer",
    sideEffects: ["Headache", "Dizziness", "Nausea"],
    alternatives: ["Isordil", "Imdur", "Monoket"]
  },
  // Spine Implants category
  {
    name: "Cervical Cage",
    category: "Spine Implants",
    price: 45000,
    manufacturer: "Medtronic",
    material: "PEEK (Polyetheretherketone)",
    size: "6mm x 14mm",
    sterilization: "Gamma Sterilized",
    shelfLife: "5 years",
    surgicalTechnique: "Anterior Cervical Discectomy and Fusion (ACDF)",
    compatibility: ["Cervical Plates", "Bone Grafts", "Screw Systems"],
    certifications: ["CE Mark", "FDA Approved", "ISO 13485"],
    warranty: "10 years",
    surgicalTime: "1-2 hours",
    recoveryTime: "4-6 weeks",
    sideEffects: [
      "Neck pain",
      "Dysphagia",
      "Adjacent segment disease",
      "Hardware failure"
    ],
    alternatives: [
      {
        name: "Titanium Cervical Cage",
        manufacturer: "Johnson & Johnson",
        price: 48000,
        material: "Titanium Alloy",
        advantages: [
          "Better bone integration",
          "Higher strength",
          "Longer lifespan"
        ]
      },
      {
        name: "Carbon Fiber Cage",
        manufacturer: "Stryker",
        price: 42000,
        material: "Carbon Fiber Composite",
        advantages: [
          "Better imaging compatibility",
          "Lighter weight",
          "Reduced stress shielding"
        ]
      }
    ]
  },
  {
    name: "Lumbar Cage",
    category: "Spine Implants",
    price: 55000,
    manufacturer: "Zimmer Biomet",
    material: "PEEK",
    size: "8mm x 18mm",
    sterilization: "Ethylene Oxide",
    shelfLife: "5 years",
    surgicalTechnique: "Transforaminal Lumbar Interbody Fusion (TLIF)",
    compatibility: ["Pedicle Screws", "Rod Systems", "Bone Grafts"],
    certifications: ["CE Mark", "FDA Approved", "ISO 13485"],
    warranty: "10 years",
    surgicalTime: "2-3 hours",
    recoveryTime: "6-8 weeks",
    sideEffects: [
      "Back pain",
      "Nerve damage",
      "Adjacent segment disease",
      "Hardware failure"
    ],
    alternatives: [
      {
        name: "Expandable Lumbar Cage",
        manufacturer: "NuVasive",
        price: 58000,
        material: "Titanium",
        advantages: [
          "Adjustable height",
          "Better fit",
          "Reduced subsidence"
        ]
      },
      {
        name: "3D Printed Lumbar Cage",
        manufacturer: "Globus Medical",
        price: 52000,
        material: "Titanium Alloy",
        advantages: [
          "Custom fit",
          "Better bone integration",
          "Reduced surgical time"
        ]
      }
    ]
  },
  {
    name: "Lumbar Pedicle Screw",
    category: "Spine Implants",
    price: 1800,
    combination: false,
    strength: "6.5mm",
    dosageForm: "Implant",
    manufacturer: "DePuy Synthes",
    sideEffects: ["Screw loosening", "Hardware failure", "Infection risk"],
    alternatives: [
      {
        name: "Titanium Screw",
        manufacturer: "Medtronic",
        price: 2000,
        material: "Titanium",
        advantages: ["Excellent biocompatibility", "High strength", "Good imaging compatibility"]
      },
      {
        name: "Cobalt Chrome Screw",
        manufacturer: "Zimmer Biomet",
        price: 2200,
        material: "Cobalt Chrome",
        advantages: ["Superior wear resistance", "High fatigue strength", "Long-term durability"]
      },
      {
        name: "Polyaxial Screw",
        manufacturer: "Globus Medical",
        price: 1900,
        material: "Titanium",
        advantages: ["Multi-directional fixation", "Easier rod placement", "Better anatomical fit"]
      }
    ],
    material: "Titanium",
    size: "6.5mm x 45mm",
    sterilization: "Ethylene Oxide",
    shelfLife: "3 years",
    surgicalTechnique: "TLIF/PLIF",
    compatibility: ["L1-S1"],
    certifications: ["CE", "FDA", "ISO 13485"],
    warranty: "2 years",
    surgicalTime: "90-120 minutes",
    recoveryTime: "3-6 months"
  },
  {
    name: "Interbody Fusion Device",
    category: "Spine Implants",
    price: 3200,
    combination: false,
    strength: "8mm",
    dosageForm: "Implant",
    manufacturer: "NuVasive",
    sideEffects: ["Device subsidence", "Non-union", "Infection risk"],
    alternatives: [
      {
        name: "ALIF Device",
        manufacturer: "Medtronic",
        price: 3500,
        material: "PEEK",
        advantages: ["Larger footprint", "Better lordosis restoration", "Reduced approach morbidity"]
      },
      {
        name: "TLIF Device",
        manufacturer: "DePuy Synthes",
        price: 3300,
        material: "Titanium",
        advantages: ["Posterior approach", "Unilateral access", "Reduced nerve retraction"]
      },
      {
        name: "PLIF Device",
        manufacturer: "Stryker",
        price: 3400,
        material: "PEEK",
        advantages: ["Bilateral access", "Direct decompression", "Familiar approach"]
      }
    ],
    material: "PEEK with Titanium Coating",
    size: "8mm x 18mm",
    sterilization: "Gamma Sterilized",
    shelfLife: "5 years",
    surgicalTechnique: "ALIF/TLIF/PLIF",
    compatibility: ["L2-S1"],
    certifications: ["CE", "FDA", "ISO 13485"],
    warranty: "2 years",
    surgicalTime: "120-180 minutes",
    recoveryTime: "6-12 months"
  },
  {
    name: "Artificial Disc",
    category: "Spine Implants",
    price: 4500,
    combination: false,
    strength: "10mm",
    dosageForm: "Implant",
    manufacturer: "Medtronic",
    sideEffects: ["Device wear", "Adjacent segment disease", "Infection risk"],
    alternatives: [
      {
        name: "Mobi-C Disc",
        manufacturer: "Zimmer Biomet",
        price: 4800,
        material: "Metal-on-Polyethylene",
        advantages: ["Multi-level indication", "Motion preservation", "Reduced adjacent level stress"]
      },
      {
        name: "Prestige LP",
        manufacturer: "Medtronic",
        price: 4600,
        material: "Metal-on-Metal",
        advantages: ["Low profile design", "Excellent wear resistance", "Long-term durability"]
      },
      {
        name: "ProDisc-C",
        manufacturer: "Centinel Spine",
        price: 4700,
        material: "Metal-on-Polyethylene",
        advantages: ["Fixed core design", "Predictable motion", "Proven long-term results"]
      }
    ],
    material: "Metal-on-Polyethylene",
    size: "10mm x 14mm",
    sterilization: "Gamma Sterilized",
    shelfLife: "10 years",
    surgicalTechnique: "ADR",
    compatibility: ["C3-C7", "L4-S1"],
    certifications: ["CE", "FDA", "ISO 13485"],
    warranty: "5 years",
    surgicalTime: "90-150 minutes",
    recoveryTime: "3-6 months"
  },
  {
    name: "Spinal Cord Stimulator",
    category: "Spine Implants",
    price: 15000,
    combination: false,
    strength: "N/A",
    dosageForm: "Device",
    manufacturer: "Boston Scientific",
    sideEffects: ["Device migration", "Battery failure", "Infection risk"],
    alternatives: [
      {
        name: "Medtronic SCS",
        manufacturer: "Medtronic",
        price: 16000,
        material: "Titanium",
        advantages: ["Advanced programming", "Long battery life", "Multiple therapy options"]
      },
      {
        name: "Abbott SCS",
        manufacturer: "Abbott",
        price: 15500,
        material: "Titanium",
        advantages: ["Burst stimulation", "Dorsal root ganglion targeting", "MRI compatibility"]
      },
      {
        name: "Nevro SCS",
        manufacturer: "Nevro",
        price: 14500,
        material: "Titanium",
        advantages: ["High-frequency therapy", "No paresthesia", "Long-term pain relief"]
      }
    ],
    material: "Titanium and Silicone",
    size: "Programmable",
    sterilization: "Ethylene Oxide",
    shelfLife: "10 years",
    surgicalTechnique: "Percutaneous",
    compatibility: ["All Spinal Levels"],
    certifications: ["CE", "FDA", "ISO 13485"],
    warranty: "5 years",
    surgicalTime: "60-90 minutes",
    recoveryTime: "2-4 weeks"
  },
  {
    name: "Vertebral Body Replacement",
    category: "Spine Implants",
    price: 3800,
    combination: false,
    strength: "Expandable",
    dosageForm: "Implant",
    manufacturer: "Stryker",
    sideEffects: ["Device subsidence", "Hardware failure", "Infection risk"],
    alternatives: [
      {
        name: "Static VBR",
        manufacturer: "DePuy Synthes",
        price: 3500,
        material: "Titanium",
        advantages: ["Simple design", "Cost-effective", "Proven reliability"]
      },
      {
        name: "Expandable VBR",
        manufacturer: "Globus Medical",
        price: 4200,
        material: "Titanium",
        advantages: ["Adjustable height", "Better fit", "Reduced subsidence risk"]
      },
      {
        name: "Mesh Cage",
        manufacturer: "Medtronic",
        price: 3600,
        material: "Titanium",
        advantages: ["Bone graft containment", "Good stability", "Cost-effective"]
      }
    ],
    material: "Titanium",
    size: "Expandable 10-40mm",
    sterilization: "Gamma Sterilized",
    shelfLife: "5 years",
    surgicalTechnique: "Corpectomy",
    compatibility: ["T1-L5"],
    certifications: ["CE", "FDA", "ISO 13485"],
    warranty: "2 years",
    surgicalTime: "180-240 minutes",
    recoveryTime: "6-12 months"
  },
  {
    name: "Interspinous Process Spacer",
    category: "Spine Implants",
    price: 2800,
    combination: false,
    strength: "N/A",
    dosageForm: "Implant",
    manufacturer: "Medtronic",
    sideEffects: ["Spacer migration", "Spinous process fracture", "Infection risk"],
    alternatives: [
      {
        name: "X-STOP",
        manufacturer: "Medtronic",
        price: 3000,
        material: "Titanium",
        advantages: ["Minimally invasive", "Preserves motion", "Quick recovery"]
      },
      {
        name: "Coflex",
        manufacturer: "Paradigm Spine",
        price: 3200,
        material: "Titanium",
        advantages: ["Dynamic stabilization", "Motion preservation", "Reduced adjacent level stress"]
      },
      {
        name: "DIAM",
        manufacturer: "Medtronic",
        price: 2900,
        material: "Silicone",
        advantages: ["Soft tissue stabilization", "Minimal bone removal", "Quick recovery"]
      }
    ],
    material: "PEEK",
    size: "12mm x 14mm",
    sterilization: "Gamma Sterilized",
    shelfLife: "5 years",
    surgicalTechnique: "Minimally Invasive",
    compatibility: ["L1-L5"],
    certifications: ["CE", "FDA", "ISO 13485"],
    warranty: "2 years",
    surgicalTime: "30-45 minutes",
    recoveryTime: "2-4 weeks"
  }
];

export default drugs; 