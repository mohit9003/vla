import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  experiment: { type: String, required: true },
  teacherCode: { type: String, required: true },
  fileName: { type: String },
  fileData: { type: String },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);
