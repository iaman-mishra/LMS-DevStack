import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';

const app = express();

// Middleware
app.use(cors());

app.get('/', (req, res) => res.send('Server is working!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})