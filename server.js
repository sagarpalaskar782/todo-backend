// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authController from './src/controllers/auth-controller.js';
import cors from 'cors';
import taskController from './src/controllers/task-controller.js';
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

// Connect to MongoDB
const connectDB = async () => {
    console.log('Attempting to connect to MongoDB with URI:', process.env.MONGO_URI);

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

connectDB();

// API Routes
app.use('/api/auth', authController);
app.use('/api/task', taskController);


// Basic route for testing server status
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT} ${process.env.MONGO_URI}`));