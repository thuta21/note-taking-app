import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connect = async (uri) => {
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.error(`Error in DB connection: ${err.message}`);
    }
};

export default connect(process.env.MONGO_URI);
