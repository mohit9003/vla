import mongoose from 'mongoose';

const labSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, default: 'from-indigo-500 to-purple-500' },
  procedures: [String],
  equipment: [String]
}, { timestamps: true });

export default mongoose.model('Lab', labSchema);
