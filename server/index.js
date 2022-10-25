import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import asyncErrors from 'express-async-errors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import cookieSession from 'cookie-session';
import cors from "cors";
import exceptionHandler from './middleware/exceptionHandler.js';
import {sequelize} from './models/database.js'
const app = express();

import tinify from "tinify";
tinify.key = process.env.TINIFY_KEY;

dotenv.config({ path: './config.env' });

import userRoute from './routes/userRoute.js';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession({ name: 'session', keys: ['key1', 'key2'] }));
//app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');
    next();
  });

app.use('/api/v1/', userRoute);
app.use(exceptionHandler);

let port = process.env.PORT || 5000;

app.listen(port, async () => {
    console.log('Establishing connection...');
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    console.log(`Server is listening on port ${port}`)
})