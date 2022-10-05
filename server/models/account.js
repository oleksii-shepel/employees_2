export default function (sequelize, DataTypes) {
    return sequelize.define('Account', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'compositeIndex',
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'compositeIndex'
        }
    }, {
        tableName: 'Accounts',
        timestamps: true
    });
};