import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import router from './routes';
const mongoDb = process.env.MONGO_URI || "mongodb://localhost:27017/task_management"
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());


// Routes
app.use('/', router);

console.log('MongoDB URI:', mongoDb);
// Connect to MongoDB
mongoose
    .connect(mongoDb)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});