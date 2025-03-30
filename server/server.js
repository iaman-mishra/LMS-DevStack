import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import { clerkWebhooks } from './controllers/Webhooks.js';

// Initialize express
const app = express();
 

// Connect to MongoDB
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Server is working!'));
app.post('/clerk', clerkWebhooks);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})