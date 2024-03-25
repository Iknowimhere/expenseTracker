import Expense from '../models/Expense.js';
import User from '../models/User.js';

export const getDashboard = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const expenses = await Expense.find();
    res.render('Dashboard', { expenses, user });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getExpenseById = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.render('UpdateExpense', { expense });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createExpense = async (req, res, next) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.redirect('/api/v1/expenseTracker/expenses');
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.redirect('/api/v1/expenseTracker/expenses');
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.redirect('/api/v1/expenseTracker/expenses');
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
