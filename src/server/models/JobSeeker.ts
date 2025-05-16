import mongoose from 'mongoose';

const jobSeekerSchema = new mongoose.Schema({
  seekerId: {
    type: String,
    required: true,
    unique: true,
  },
  whatsappNumber: {
    type: String,
    sparse: true,
  },
  status: {
    type: String,
    default: 'new',
    enum: ['new', 'in_progress', 'completed', 'inactive'],
  },
  preferences: {
    role: String,
    location: String,
    experience: Number,
  },
  testScores: [{
    testId: String,
    score: Number,
    completedAt: Date,
  }],
}, {
  timestamps: true,
});

export const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);