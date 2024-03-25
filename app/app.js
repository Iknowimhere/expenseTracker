import express from 'express';
import dbConnection from '../config/db.js';
import userRouter from '../routes/userRoutes.js';
import dashboardRouter from '../routes/dashBoardRoute.js';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
dbConnection();
let app = express();
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('welcome');
});
app.use('/api/v1/expenseTracker', userRouter);
app.use('/api/v1/expenseTracker', dashboardRouter);

export default app;
