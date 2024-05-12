import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const databaseConnection = async function(){
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.log(`Database connection Error: ${error}`);
    }
}

export default databaseConnection;