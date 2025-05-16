import { Express, json } from 'express';
import express from 'express';
import { connectDB } from './db';
import twilioWebhook from './api/twilio-webhook';
import leaderboard from './api/leaderboard';
import jobSeekers from './api/job-seekers';
import { config } from './config';

const app: Express = express();
app.use(json());

// Connect to MongoDB
connectDB();

// API routes
app.use('/api/job-seekers', jobSeekers);
app.use('/api', twilioWebhook);
app.use('/api', leaderboard);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});