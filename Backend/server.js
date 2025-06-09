import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';


dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/BloggersDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello from Express + MongoDB');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));