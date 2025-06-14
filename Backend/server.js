//importing required modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

//Importing routes
import instantBlogPost from './routes/instantBlogPost.js';
import signupRoutes from './routes/signup.js';
import signinRoutes from './routes/signin.js';
import blogRoutes from './routes/blog.js';

// Load environment variables from .env file
dotenv.config();




//cors for frontend and backend communication
// This allows the frontend to make requests to the backend
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  methods: ['GET', 'POST'],
  credentials: true,
}));

//calling signin and signup routes
app.use('/api', signupRoutes);
app.use('/api', signinRoutes);
app.use('/api', blogRoutes);



//cors config for socket.io
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  }
});

instantBlogPost(io); // Initialize the instant blog post functionality




// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/BloggersDB", {//mongoDB URL
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));




// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Blogger API');
});


// Error handling middleware
const PORT =  5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));