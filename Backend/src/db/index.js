import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDb connection error', error);
        process.exit(1)
    }
}

export default connectDB