import express from 'express';
import dotenv from 'dotenv';
import userRouter from './src/routes/user.routes.js';
import walletRoute from './src/routes/wallet.route.js';
import { connect } from './src/database/connection.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use('/user', userRouter);
app.use('/wallet', walletRoute);

connect().then(() => {
    console.log('Connected to the MongoDB database');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});