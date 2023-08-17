
const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require ('bcrypt');
//const { timeStamp } = require('console');

// create our User model

class User extends Model{
    checkpassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// define table columns and configuration

User.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        Username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isEmail:true
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[4]
            }
        }
    },

    // add hooks to hash password before creating or updating user
    {
        hooks:{
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password,10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData){
                updatedUserData.password = await bcrypt.hash(updatedUserData.password,10);
                return updatedUserData;
            }
        },
        sequelize,
        timeStamp:false,
        freezeTableName:true,
        underscored:true,
        modelName: 'user'
    }
);

module.exports = User;