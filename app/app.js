import express from 'express';
import dbConnection from '../config/db.js';
import userRouter from '../routes/userRoutes.js';
dbConnection();
let app = express();

app.use(express.json());
app.use('/api/v1/expenseTracker', userRouter);

//  /api/v1/expenseTracker/register
export default app;
