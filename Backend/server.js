import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import signupRoutes from './routes/signup.js';
import signinRoutes from './routes/signin.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  methods: ['GET', 'POST'],
  credentials: true,
}));

mongoose.connect("mongodb://127.0.0.1:27017/BloggersDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/api', signupRoutes);
app.use('/api', signinRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Blogger API');
});

const PORT =  5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));