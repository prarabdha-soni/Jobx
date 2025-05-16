import express from 'express';
import { JobSeeker } from '../models/JobSeeker';

const router = express.Router();

// Create a new job seeker
router.post('/', async (req, res) => {
  try {
    const { seekerId } = req.body;
    
    if (!seekerId) {
      return res.status(400).json({ error: 'Seeker ID is required' });
    }

    const jobSeeker = await JobSeeker.findOneAndUpdate(
      { seekerId },
      { status: 'new' },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, jobSeeker });
  } catch (error: any) {
    console.error('Error creating job seeker:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;