import jwt from "jsonwebtoken";
import { Op } from 'sequelize';

import tinify from "tinify";
tinify.key = process.env.TINIFY_KEY;

import { Account, Position, User } from "../models/database.js";

export const getToken = async (req, res) => {
    const account = await Account.findOne();
    if (!account) {
        res.status(404).json({
            success: false,
            message: "Login and password not found."
        })
        return;
    }

    const token = jwt.sign({ id: account.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    req.session.tokenValid = true;

    res.status(200)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
}

export const getUsers = async (req, res) => {
    let { offset, page, count } = req.query;

    page = page ? +page : 1;
    count = count ? +count : 5;

    if(!!offset) {
        page = Math.floor(+offset / count) + 1;
    }
    else {
        offset = (page - 1) * count;    
    }
    
    const total_users = await User.count();
    const total_pages = Math.ceil(total_users / count);

    let users = await User.findAll({
        include: [ { model: Position, as: 'position', attributes: ["name"] } ],
        order: [
            ["id", "ASC"]
        ],
        offset: +offset,
        limit: +count,
        subQuery: false
    });

    res.status(200).json({
        success: true,
        page,
        total_pages,
        total_users,
        count,
        links: {
            next_url: page * count >= total_users ? null : `users?page=${page + 1}&count=${count}`,
            prev_url: page > 1 ? `users?page=${page - 1}&count=${count}` : null
        },
        users
    });
}

export const postUsers = async (req, res) => {
    const { name, email, phone, photo, position } = req.body;

    const pos = await Position.findOne({ where: { id: +position } });
    if (!pos) {
        res.status(404).json({ success: false, message: "Position not found."});
        return;
    }
    
    let user = await User.findOne({where: { [Op.or]: [ { email }, { phone } ]}});
    
    if(user) {
        res.status(409).json({ success: false, message: "User with this phone or email already exist"});
        return;
    }

    let buffer = null;
    
    if(req.file) {
        buffer = req.file.buffer;
        const source = tinify.fromBuffer(buffer);
        const thumbnail = source.resize({
            method: "thumb",
            width: 70,
            height: 70
        });

        buffer = await thumbnail.toBuffer()
    }

    user = await User.create({ name, email, phone, photo: buffer, position_id: pos.id });
    res.status(200).json({
        success : true,
        user_id : user.id,
        message : "New user successfully registered"
      });
}

export const getUser = async (req, res) => {
    const id = req.params.id;
    
    const idNumber = Number.parseInt(id);

    if (isNaN(idNumber)) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            fails: { user_id: ["The user_id must be an integer."] }
        });

        return;
    }

    const user = await User.findOne({
        include: [ { model: Position, as: 'position', attributes: ["name"] } ],
        where: {
            id: idNumber
        }
    });

    if (!user) {
        res.status(404).json({
            success: false,
            message: "The user with the requested identifier does not exist",
            fails: { user_id: ["User not found"] }
        });

        return;
    }

    res.status(200).json({
        success: true,
        user
    });
}

export const getPositions = async (req, res) => {
    try {
        const positions = await Position.findAll();
        if (!positions) {
            res.status(422).json({ success: false, message: "Positions not found" });
        }
        res.status(200).json({ success: true, positions });
    }
    catch (err) {
        res.status(404).json({ success: false, message: "Page not found" });
    }
}