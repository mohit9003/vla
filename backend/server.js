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

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  bufferMaxEntries: 0
})
  .then(async () => {
    console.log(' MongoDB Connected');
    // Auto-seed database on startup
    await seedDatabase();
  })
  .catch(err => console.log(' MongoDB Error:', err));

// Auto-seed function
async function seedDatabase() {
  try {
    const { default: Lab } = await import('./models/Lab.js');
    const { default: User } = await import('./models/User.js');
    const bcrypt = await import('bcryptjs');
    
    // Check if admin exists
    const adminExists = await User.findOne({ email: 'admin@vla.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin',
        email: 'admin@vla.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✅ Admin user created');
    }
    
    // Check if labs exist
    const labCount = await Lab.countDocuments();
    if (labCount === 0) {
      const labs = [
        { name: 'Physics Lab', description: 'Explore mechanics, optics and motion.', color: 'from-indigo-500 to-purple-500' },
        { name: 'Chemistry Lab', description: 'Mix and analyze compounds safely.', color: 'from-pink-500 to-red-400' },
        { name: 'Computer Science Lab', description: 'Run algorithms and simulations.', color: 'from-green-500 to-emerald-400' },
        { name: 'Electrical Lab', description: 'Circuit theory and power systems.', color: 'from-yellow-400 to-orange-500' }
      ];
      await Lab.insertMany(labs);
      console.log('✅ Labs seeded');
    }
  } catch (error) {
    console.log('Seed error:', error.message);
  }
}

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
