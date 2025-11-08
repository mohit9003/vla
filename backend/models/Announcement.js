import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  createdBy: { type: String, default: 'Admin' }
}, { timestamps: true });

export default mongoose.model('Announcement', announcementSchema);
