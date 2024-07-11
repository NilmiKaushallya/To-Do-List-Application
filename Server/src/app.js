import express from "express";
import apiRoute, { apiProtected } from './routes/api.js';
import { DB_CONNECT } from "./utils/constants.js";
import mongoose from "mongoose";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import cors from 'cors';

const app = express();
const PORT = 8000;

async function initializeServer() {
    try {
        // Connect to MongoDB
        await mongoose.connect(DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Middleware
        app.use(cors());
        app.use(express.json());

        // Routes
        app.use('/api/', apiRoute);
        app.use('/api/', AuthMiddleware, apiProtected);

        // Start the server
        app.listen(PORT, () => console.log('Server is running on port', PORT));
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
}

initializeServer();
