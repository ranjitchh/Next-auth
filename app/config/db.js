import { mongoose } from "mongoose";

const connnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongoose")
  } catch (error) {
    console.log(`ERRROR: ${error.message}`);
    process.exit(1);
  }
};

export default connnectDB;