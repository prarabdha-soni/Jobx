import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Company',
  },
  description: String,
  requirements: [String],
  location: String,
  salary: {
    min: Number,
    max: Number,
    currency: String,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'filled', 'expired'],
  },
}, {
  timestamps: true,
});

export const Job = mongoose.model('Job', jobSchema);