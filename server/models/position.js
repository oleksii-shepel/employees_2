export default function (sequelize, DataTypes) {
    return sequelize.define('Position', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        tableName: 'Positions',
        timestamps: true
    });
};