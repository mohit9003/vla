import mongoose from 'mongoose';

const experimentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  labId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lab', required: true },
  description: { type: String },
  resources: [{
    name: String,
    type: String,
    url: String
  }],
  deadline: { type: Date }
}, { timestamps: true });

export default mongoose.model('Experiment', experimentSchema);
