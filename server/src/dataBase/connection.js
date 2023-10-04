import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/blogApp`, {
      useNewUrlParser: true,
    });
    console.log(`Connection established to DataBase`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
