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
app.use(router);

app.all("*", (req, res, next) => {
  next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});

app.use(headers);
app.use(errorHandler);

// app.get('/', (req, res) => {
// 	res.json({ message: 'Hello from server!' });
// });

// app.post('/create-account', async (req, res) => {
// 	try {
// 	  const { fullName, email, password } = req.body;

// 	  if (!fullName || !email || !password) {
// 		return res.status(400).json({ error: true, message: 'All fields are required.' });
// 	  }

// 	  const existingUser = await User.findOne({ email });
// 	  if (existingUser) {
// 		return res.status(400).json({ error: true, message: 'User with this email already exists.' });
// 	  }

// 	  const hashedPassword = await bcrypt.hash(password, 10);

// 	  const newUser = new User({
// 		fullName,
// 		email,
// 		password: hashedPassword,
// 	  });

// 	  await newUser.save();

// 	  const accessToken = jwt.sign(
// 		{ email: newUser.email },
// 		process.env.ACCESS_TOKEN_SECRET,
// 		{ expiresIn: '1h' }
// 	  );

// 	  return res.status(201).json({
// 		error: false,
// 		user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email },
// 		accessToken,
// 		message: 'Account created successfully!',
// 	  });
// 	} catch (error) {
// 	  console.error(error);
// 	  return res.status(500).json({ error: true, message: 'Internal server error.' });
// 	}
//   });

app.listen(8000, () => {
	console.log('Server is running on port 8000');
});


export default app;
