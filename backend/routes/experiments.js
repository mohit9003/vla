import express from 'express';
import Experiment from '../models/Experiment.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const experiments = await Experiment.find();
    res.json(experiments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/lab/:labId', async (req, res) => {
  try {
    const experiments = await Experiment.find({ labId: req.params.labId });
    res.json(experiments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const experiment = await Experiment.findById(req.params.id);
    res.json(experiment);
  } catch (error) {
    res.status(404).json({ message: 'Experiment not found' });
  }
});

router.post('/', async (req, res) => {
  try {
    const experiment = await Experiment.create(req.body);
    res.status(201).json(experiment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const experiment = await Experiment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(experiment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Experiment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experiment deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
