import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL || '';
export default async () => {
    if ((mongoose.connection?.readyState !== 1) && (mongoose.connection?.readyState !== 2)) {
        await mongoose.connect(MONGODB_URL);
        const db = mongoose.connection;
        const handleOpen = () => console.log("✔ Connected to DB");
        const handleError = () => console.log("❌ Error on DB Connection");

        db.once("open", handleOpen);
        db.on("error", handleError);
    }
}