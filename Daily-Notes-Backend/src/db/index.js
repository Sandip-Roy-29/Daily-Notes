import mongoose from "mongoose";

let uri;

if(process.env.NODE_ENV === "test") uri = process.env.MONGODB_URI_TEST;
else if(process.env.NODE_ENV === "development") uri = process.env.MONGODB_URI_DEV;
else uri = process.env.MONGODB_URI_PROD;

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            uri,
            {
                maxPoolSize: parseInt(process.env.MONGODB_MAX_POOL_SIZE || 10),
                minPoolSize: parseInt(process.env.MONGODB_MIN_POOL_SIZE || 5),
                socketTimeoutMS: 30000, // 30 seconds
                serverSelectionTimeoutMS: 30000, // 30 seconds
                heartbeatFrequencyMS: 10000, // 10 seconds
            }
        );
        console.log(`MongoDB connected !! DB host ${connectionInstance.connection.host}`);        
    } catch (error) {
        console.log("MongoDB connection failed ", error);
        throw error;
    }
}

export default connectDB;