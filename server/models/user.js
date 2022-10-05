export default function (sequelize, DataTypes) {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                len: {
                    args: [2,60],
                    msg: "String length is not in this range"
                }
            }
        },

        email: {
            type: DataTypes.STRING(100),
            validate: {
                isEmail: true,
                len: {
                    args: [2,100],
                    msg: "String length is not in this range"
                }
            }
        },

        phone: {
            type: DataTypes.STRING,
            validate: {
                isUkrainianPhonenumber(value) {
                    if (!value){
                        throw new Error('Phone number is not specified.');
                    }
                    
                    let phone = value.toString().replace(/[\(\)\.\ \-]+/g,"");
                    if(!phone.match(/^\+380\d{9}$/)){
                        throw new Error('Number should start with code of Ukraine +380');
                    }
                }
            }
        },

        photo: {
            type: DataTypes.BLOB('tiny'),
            allowNull: true
        }
    }, {
        tableName: 'Users',
        timestamps: true
    });
};