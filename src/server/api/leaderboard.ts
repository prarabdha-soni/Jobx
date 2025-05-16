import express from 'express';
import { JobSeeker } from '../models/JobSeeker';

const router = express.Router();

// Get leaderboard data
router.get('/leaderboard', async (req, res) => {
  try {
    const jobSeekers = await JobSeeker.find()
      .sort({ 'testScores.score': -1 })
      .limit(10);
    
    res.status(200).json({ jobSeekers });
  } catch (error: any) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;