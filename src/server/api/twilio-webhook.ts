import express from 'express';
import twilio from 'twilio';
import { JobSeeker } from '../models/JobSeeker';
import { Job } from '../models/Job';
import { Application } from '../models/Application';

const router = express.Router();

// Initialize Twilio client only if credentials are available
let client: any = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

router.post('/webhook', async (req, res) => {
  try {
    // If Twilio is not configured, return a message
    if (!client) {
      return res.status(200).json({ 
        message: 'Twilio integration is not configured yet. Please add Twilio credentials to enable WhatsApp integration.' 
      });
    }

    const { Body: message, From: from } = req.body;
    const seekerIdMatch = message.match(/ID: ([a-z0-9]+)/i);
    const seekerId = seekerIdMatch ? seekerIdMatch[1] : null;

    if (seekerId) {
      // New user registration
      const jobSeeker = await JobSeeker.findOneAndUpdate(
        { seekerId },
        { whatsappNumber: from },
        { upsert: true, new: true }
      );

      await client.messages.create({
        body: `Welcome to JobX! Let's find the perfect job for you. What type of role are you looking for? (e.g., Software Developer, Designer, Marketing)`,
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: from
      });
    } else {
      // Existing conversation flow
      const jobSeeker = await JobSeeker.findOne({ whatsappNumber: from });
      
      if (!jobSeeker) {
        return res.status(400).json({ error: 'Job seeker not found' });
      }

      // Handle different conversation stages
      switch (jobSeeker.status) {
        case 'new':
          // Save job role preference
          await JobSeeker.findByIdAndUpdate(jobSeeker._id, {
            'preferences.role': message,
            status: 'in_progress'
          });

          // Find matching jobs
          const matchingJobs = await Job.find({
            title: { $regex: message, $options: 'i' },
            status: 'active'
          }).limit(3);

          const jobsList = matchingJobs.map((job, index) => 
            `${index + 1}. ${job.title} at ${job.companyName}\n`
          ).join('\n');

          await client.messages.create({
            body: `Great! I found these matching positions:\n\n${jobsList}\nReply with the number to apply.`,
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: from
          });
          break;

        case 'in_progress':
          // Handle job application
          const jobIndex = parseInt(message) - 1;
          const jobs = await Job.find({ status: 'active' }).limit(3);
          
          if (jobs[jobIndex]) {
            const application = new Application({
              seekerId: jobSeeker.seekerId,
              jobId: jobs[jobIndex]._id,
              status: 'applied'
            });
            await application.save();

            await client.messages.create({
              body: `Perfect! I've submitted your application. You'll receive a test assignment shortly.`,
              from: process.env.TWILIO_WHATSAPP_NUMBER,
              to: from
            });

            // Send test after a short delay
            setTimeout(async () => {
              await client.messages.create({
                body: `Here's your test assignment:\n\nPlease solve the following problem:\n[Test content here]\n\nReply with your answer.`,
                from: process.env.TWILIO_WHATSAPP_NUMBER,
                to: from
              });
            }, 5000);
          }
          break;

        default:
          await client.messages.create({
            body: `I'm here to help! What would you like to know about your application?`,
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: from
          });
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;