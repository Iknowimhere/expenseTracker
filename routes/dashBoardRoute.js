import express from 'express';
import {
  createExpense,
  deleteExpense,
  getDashboard,
  getExpenseById,
  updateExpense,
} from '../controllers/dashBoardControllers.js';


let dashboardRouter = express.Router();

dashboardRouter.get('/expenses', getDashboard);
dashboardRouter.post('/expenses', createExpense);
dashboardRouter.get('/expenses/:id', getExpenseById);
dashboardRouter.put('/expenses/:id', updateExpense);
dashboardRouter.delete('/expenses/:id', deleteExpense);

export default dashboardRouter;
