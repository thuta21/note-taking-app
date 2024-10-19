import express, { json } from 'express';
import cors from 'cors';
import AppError from "./utils/appError.js";
import errorHandler from "./utils/errorHandler.js";
import headers from "./utils/header.js";
import router from './routes/index.js';
import bodyParser from 'body-parser';
import './database/connection.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(json());
app.use(bodyParser.urlencoded({extended: false }));
app.use('/api', router);

app.all("*", (req, res, next) => {
  next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});

app.use(headers);
app.use(errorHandler);

app.listen(8000, () => {
	console.log('Server is running on port 8000');
});

export default app;
