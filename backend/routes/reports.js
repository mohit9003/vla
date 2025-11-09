import express from 'express';
import multer from 'multer';
import Report from '../models/Report.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  }
});

router.post('/', upload.single('reportFile'), async (req, res) => {
  try {
    const reportData = {
      studentName: req.body.studentName,
      experiment: req.body.experiment,
      teacherCode: req.body.teacherCode
    };
    
    if (req.file) {
      reportData.fileName = req.file.originalname;
      reportData.fileData = req.file.buffer.toString('base64');
    }
    
    const report = await Report.create(reportData);
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/teacher/:code', async (req, res) => {
  try {
    const reports = await Report.find({ teacherCode: req.params.code });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ submittedAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: 'Report deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Download file endpoint
router.get('/download/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report || !report.fileData) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    const buffer = Buffer.from(report.fileData, 'base64');
    res.setHeader('Content-Disposition', `attachment; filename="${report.fileName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
