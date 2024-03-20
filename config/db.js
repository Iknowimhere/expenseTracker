import mongoose from 'mongoose';

async function dbConnection() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/expenseDB');
    console.log(`db connected `);
  } catch (error) {
    console.log(error.message);
  }
}

export default dbConnection;
