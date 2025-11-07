import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/last-teacher-code', async (req, res) => {
  try {
    res.json({ code: 'VLA123' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
