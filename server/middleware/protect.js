import jwt from 'jsonwebtoken';
import { Account } from '../models/database.js';

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (req.session.tokenValid === false) {
        throw new Error('Token is not valid. Please request new token');
    }

    req.session.tokenValid = false;

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