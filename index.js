import express from 'express';
import cors from 'cors';
import serpApiRoutes from './routes/serApi.js'; // or whatever your route file is
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// CORS middleware should be defined BEFORE routes
app.use(cors({
  origin: '*', // or specify your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Your API routes
app.use('/api', serpApiRoutes);

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
