import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config({ path: './config.env' });

export const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres:5432/${process.env.POSTGRES_DB}`)
console.log(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres:5432/${process.env.POSTGRES_DB}`);

import user2 from "./user.js";
export const User = user2(sequelize, DataTypes);

import position2 from "./position.js";
export const Position = position2(sequelize, DataTypes);
import account2 from "./account.js";
export const Account = account2(sequelize, DataTypes);

User.belongsTo(Position, { foreignKey: "position_id", as: "position" });

export default {
    User,
    Position,
    Account,
    sequelize
}