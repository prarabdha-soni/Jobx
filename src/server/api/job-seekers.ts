import { Router } from 'express';
import { JobSeeker } from '../models/JobSeeker';
import { RequestHandler } from '../types/express';

const router = Router();

// Create a new job seeker
const createJobSeeker: RequestHandler = async (req, res) => {
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
  } catch (error) {
    console.error('Error creating job seeker:', error);
    // Ensure we always send a JSON response
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

router.post('/', createJobSeeker);

export default router;