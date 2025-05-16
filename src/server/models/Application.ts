import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  seekerId: {
    type: String,
    required: true,
    ref: 'JobSeeker',
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Job',
  },
  status: {
    type: String,
    default: 'applied',
    enum: ['applied', 'screening', 'test_sent', 'test_completed', 'shortlisted', 'rejected'],
  },
  testScore: Number,
  interview: {
    scheduled: Date,
    feedback: String,
  },
}, {
  timestamps: true,
});

export const Application = mongoose.model('Application', applicationSchema);