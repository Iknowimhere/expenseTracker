import express from 'express';
import {
  createExpense,
  deleteExpense,
  getDashboard,
  getExpenseById,
  updateExpense,
} from '../controllers/dashBoardControllers.js';
import { isLogged } from '../middleware/auth.js';

let dashboardRouter = express.Router();

dashboardRouter.get('/expenses', isLogged, getDashboard);
dashboardRouter.post('/expenses', isLogged, createExpense);
dashboardRouter.get('/expenses/:id', isLogged, getExpenseById);
dashboardRouter.put('/expenses/:id', isLogged, updateExpense);
dashboardRouter.delete('/expenses/:id', isLogged, deleteExpense);

export default dashboardRouter;
