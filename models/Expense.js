
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  name: String,
  type: String,
  amount: Number,
});

export default mongoose.model('Expense', expenseSchema);
