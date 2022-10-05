import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config({ path: './config.env' });

import { User, Position, Account, sequelize} from "./models/database.js";

import tinify from "tinify";
tinify.key = process.env.TINIFY_KEY;

const names = [
    'Artem', 'Anna', 'Alex',
    'Anka', 'Petro', 'Dmitriy',
    'Tanya', 'Vitaliy', 'Maryana',
    'Maxim', 'Sergey', 'Yana',
    'Misha', 'Illia', 'Dasha',
    'Zhenya', 'Yura', 'Yaroslav',
    'Pavlo', 'Roman', 'Julia',
    'Nastya', 'Oleg', 'Maxim',
    'Vlad'
];

const positions = [
    'Founder',
    'Art Director',
    'Sales Manager',
    'Project Manager',
    'UI/UX Designer',
    'Designer',
    'Full-stack Developer',
    'Front-end Developer',
    'Back-end Developer',
    'Trainee',
    "Security",
    "Content Manager",
    "Lawyer"
];

const seed = async function () {
    console.log('Establishing connection...');
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const source = tinify.fromUrl(`${process.env.TINIFY_DEFAULT_IMAGE}`);
    const thumbnail = source.resize({
        method: "thumb",
        width: 70,
        height: 70
    });

    const buffer = await thumbnail.toBuffer()
    
    await Account.sync({ force: true });
    await Position.sync({ force: true });
    await User.sync({ force: true });
    
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(process.env.DEFAULT_PASSWORD, salt);
    await Account.create({login: process.env.DEFAULT_LOGIN, password});

    for (let i = 0; i < positions.length; i++) {
        await Position.create({name: positions[i]});
    }

    for (let i = 0; i < 45; i++) {
        const nameIndex = Math.ceil(Math.random() * (names.length - 1));
        const positionIndex = Math.ceil(Math.random() * (positions.length - 1));
        const position = await Position.findOne({where: {name: positions[positionIndex]}});

        const employee = await User.create({
            name: names[nameIndex],
            email: `${names[nameIndex].toLowerCase()}@gmail.com`,
            phone: "+38(050)954-85-34",
            position_id: position.id,
            photo: buffer
        });
    }
}

await seed();