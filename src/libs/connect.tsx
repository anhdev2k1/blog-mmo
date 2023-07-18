import mongoose from "mongoose";

export const connectMongoDB = async () => {
    const mongoUrl = process.env.MONGO_URL as string
    mongoose.set("strictQuery", false);
    if(mongoose.connection.readyState === 1){
        return mongoose.connection.asPromise()
    }
    mongoose.connect(mongoUrl)
}