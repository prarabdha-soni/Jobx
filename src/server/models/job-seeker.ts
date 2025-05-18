import mongoose from 'mongoose';

// Check if model exists before creating a new one
const JobSeeker = mongoose.models.JobSeeker || mongoose.model('JobSeeker', new mongoose.Schema({
  seekerId: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'matched'],
    default: 'active'
  },
  experience: {
    type: String,
    default: ''
  },
  skills: [{
    type: String
  }],
  preferredRoles: [{
    type: String
  }],
  lastInteraction: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}));

export { JobSeeker }; 