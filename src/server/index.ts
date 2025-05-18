import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import jobSeekersRouter from './api/job-seekers';
import whatsappWebhookRouter from './api/whatsapp-webhook';
import leaderboardRouter from './api/leaderboard';

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Routes
app.use('/api/job-seekers', jobSeekersRouter);
app.use('/api/webhook', whatsappWebhookRouter);
app.use('/api/leaderboard', leaderboardRouter);

// Start server
const port = config.port;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});