import express from 'express';
import { whatsappService } from '../services/whatsapp';
import { JobSeeker } from '../models/job-seeker';

const router = express.Router();

// Webhook verification
router.get('/webhook', async (req, res) => {
  const mode = req.query['hub.mode'] as string;
  const token = req.query['hub.verify_token'] as string;
  const challenge = req.query['hub.challenge'] as string;

  try {
    const response = await whatsappService.verifyWebhook(mode, token, challenge);
    if (response) {
      res.status(200).send(response);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.error('Webhook verification error:', error);
    res.sendStatus(500);
  }
});

// Webhook for receiving messages
router.post('/webhook', async (req, res) => {
  try {
    const { object, entry } = req.body;

    if (object === 'whatsapp_business_account') {
      for (const entryItem of entry) {
        for (const change of entryItem.changes) {
          if (change.value.messages) {
            for (const message of change.value.messages) {
              const phoneNumber = message.from;
              const messageText = message.text?.body || '';

              // Handle job seeker registration
              if (messageText.toLowerCase().includes('looking for job')) {
                const seekerId = Math.random().toString(36).substring(7);
                
                // Create or update job seeker record
                await JobSeeker.findOneAndUpdate(
                  { phoneNumber },
                  { 
                    seekerId,
                    phoneNumber,
                    status: 'active',
                    lastInteraction: new Date()
                  },
                  { upsert: true, new: true }
                );

                // Send welcome message
                await whatsappService.sendMessage(
                  phoneNumber,
                  `Welcome to JobX! Your ID is ${seekerId}. We'll help you find the perfect job match. Please share your experience and skills.`
                );
              }
            }
          }
        }
      }
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.sendStatus(500);
  }
});

export default router; 