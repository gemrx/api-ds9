import mongoose from "mongoose";

async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

export default connectToMongoDB;

