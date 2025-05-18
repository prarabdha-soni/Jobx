import express from 'express';
import { JobSeeker } from '../models/job-seeker';

const router = express.Router();

// Get leaderboard data
router.get('/leaderboard', async (_req, res) => {
  try {
    const jobSeekers = await JobSeeker.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('seekerId phoneNumber status lastInteraction');

    res.json(jobSeekers);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

export default router;