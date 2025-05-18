import mongoose from 'mongoose';
import { config } from './config';

export const connectDB = async () => {
  try {
    if (!config.mongoUri) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    // Mask the URI for logging
    const maskedUri = config.mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//****:****@');
    console.log(`Connecting to MongoDB: ${maskedUri}`);

    await mongoose.connect(config.mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};