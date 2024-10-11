
import dotenv from "dotenv";
import { connect as _connect } from "mongoose";

dotenv.config();

const connect = (uri) => {
    _connect(uri)
.then(res => console.log(`Connection Successful...`))
.catch(err => console.log(`Error in DB connection`));
}

export default connect(process.env.MONGO_URI);
