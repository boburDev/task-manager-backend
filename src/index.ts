import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.use('/', router);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});