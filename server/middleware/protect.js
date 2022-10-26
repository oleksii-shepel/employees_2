import jwt from 'jsonwebtoken';
import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres:5432/${process.env.POSTGRES_DB}`)

import account2 from "../models/account.js";
const Account = account2(sequelize, DataTypes);

const protect = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (req.session.tokenValid === false) {
        throw new Error('Token is not valid. Please request new token');
    }

    req.session.tokenValid = false;

    console.log(token);
    if (!token) {
        throw new Error('Not authorized to access this route');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Account.findByPk(decoded.id);

    if (!req.user) {
        throw new Error('User not found.');
    }

    next();
}

export default protect;