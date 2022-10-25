import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config({ path: './config.env' });

let database_url = process.env.DATABASE_URL || "postgres://username:password@postgres:5432/db";
export const sequelize = new Sequelize(database_url, {
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      } 
    }});

console.log(database_url);

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