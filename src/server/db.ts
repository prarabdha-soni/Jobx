import mongoose from 'mongoose';
import { config } from './config';

export const connectDB = async () => {
  try {
    if (!config.mongodb.uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    // Log the MongoDB URI (masked for security)
    const maskedUri = config.mongodb.uri.replace(/\/\/[^:]+:[^@]+@/, '//****:****@');
    console.log('Attempting to connect to MongoDB:', maskedUri);
    
    await mongoose.connect(config.mongodb.uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};