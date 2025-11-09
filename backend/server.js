import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import labRoutes from './routes/labs.js';
import reportRoutes from './routes/reports.js';
import userRoutes from './routes/users.js';
import aiRoutes from './routes/ai.js';
import announcementRoutes from './routes/announcements.js';
import experimentRoutes from './routes/experiments.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://vla-app.onrender.com']
    : true,
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' MongoDB Connected'))
  .catch(err => console.log(' MongoDB Error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/labs', labRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/users', userRoutes);
app.use('/api', aiRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/experiments', experimentRoutes);

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

export default app;
