import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import { clerkWebhooks } from './controllers/Webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';

// Initialize express
const app = express();
 

// Connect to MongoDB
await connectDB();

// Middleware
app.use(cors());
app.use(clerkMiddleware())
app.use(express.json());

app.get('/', (req, res) => res.send('Server is working!'));
app.post('/clerk', clerkWebhooks);
app.use('/api/educator', educatorRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})