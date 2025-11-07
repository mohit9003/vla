import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Lab from './models/Lab.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const labs = [
  { name: 'Physics Lab', description: 'Explore mechanics, optics and motion.', color: 'from-indigo-500 to-purple-500' },
  { name: 'Chemistry Lab', description: 'Mix and analyze compounds safely.', color: 'from-pink-500 to-red-400' },
  { name: 'Computer Science Lab', description: 'Run algorithms and simulations.', color: 'from-green-500 to-emerald-400' },
  { name: 'Electrical Lab', description: 'Circuit theory and power systems.', color: 'from-yellow-400 to-orange-500' }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  await Lab.deleteMany({});
  await Lab.insertMany(labs);
  console.log(' Labs seeded');

  const hashedPassword = await bcrypt.hash('admin123', 10);
  await User.findOneAndUpdate(
    { email: 'admin@vla.com' },
    { name: 'Admin', email: 'admin@vla.com', password: hashedPassword, role: 'admin' },
    { upsert: true }
  );
  console.log('✅ Admin user created (admin@vla.com / admin123)');

  mongoose.connection.close();
}

seed();
