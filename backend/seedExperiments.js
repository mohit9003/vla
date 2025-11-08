import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Lab from './models/Lab.js';
import Experiment from './models/Experiment.js';

dotenv.config();

const experimentsData = {
  "Physics Lab": [
    "Ohm's Law Verification",
    "Measurement of Resistance using Voltmeter & Ammeter",
    "Verification of Kirchhoff's Laws",
    "Determination of Focal Length of Convex Lens",
    "Resonance in LCR Circuit",
    "Measurement of Frequency using Sonometer",
    "Reflection & Refraction through Prism",
    "Determination of Acceleration due to Gravity using Pendulum",
    "Study of Diode Characteristics",
    "Determination of Wavelength using Diffraction Grating"
  ],
  "Chemistry Lab": [
    "Acid-Base Titration",
    "Determination of pH using pH Meter",
    "Determination of Chloride Content in Water",
    "Estimation of Hardness of Water by EDTA Method",
    "Chemical Kinetics: Rate of Reaction of Hydrolysis of Ester",
    "Preparation of Standard Solution of Sodium Carbonate",
    "Conductometric Titration",
    "Determination of Iron by Colorimetry",
    "Determination of Viscosity of Liquid",
    "Preparation of Simple Salts"
  ],
  "Computer Science Lab": [
    "SQL Queries on Database",
    "Implementation of Stack and Queue (DSA)",
    "Sorting Algorithms (Bubble, Quick, Merge)",
    "CPU Scheduling Algorithms (OS)",
    "Page Replacement Algorithms",
    "Banker's Algorithm (Deadlock Avoidance)",
    "File Handling in Python / Java",
    "Implementation of Normalization (DBMS)",
    "Client-Server Communication using Socket Programming",
    "Lexical Analyzer (Compiler Design Basic)"
  ],
  "Electrical Lab": [
    "Verification of Ohm's Law",
    "Measurement of Power and Power Factor in AC Circuit",
    "Study of Series & Parallel RLC Circuit",
    "Measurement of Energy using Energy Meter",
    "Open Circuit & Short Circuit Test on Transformer",
    "Speed Control of DC Motor",
    "Load Test on DC Shunt Motor",
    "Measurement of Current using Ammeter",
    "Single Phase Bridge Rectifier",
    "Study of Star and Delta Connections"
  ]
};

async function seedExperiments() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  await Experiment.deleteMany({});
  console.log('🗑️  Cleared existing experiments');

  const labs = await Lab.find();
  
  for (const lab of labs) {
    const expNames = experimentsData[lab.name];
    if (expNames) {
      for (const expName of expNames) {
        await Experiment.create({
          name: expName,
          labId: lab._id,
          description: `Learn and perform ${expName} experiment`,
          resources: []
        });
      }
      console.log(`✅ Added ${expNames.length} experiments to ${lab.name}`);
    }
  }

  console.log('✅ All experiments seeded successfully!');
  mongoose.connection.close();
}

seedExperiments();
