const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const bcrypt = require('bcrypt');

class User extends Model {
  async checkPassword(loginPassword) {
    return bcrypt.compare(loginPassword, this.password);
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 20],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100], 
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },    
  },
  {
    hooks: {
      async beforeCreate(userData) {
        userData.password = await bcrypt.hash(userData.password, 10);
        return userData;
      },
      async beforeUpdate(userData) {
        if (userData.changed('password')) {
          userData.password = await bcrypt.hash(userData.password, 10);
        }
        return userData;
      },
    },
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {
        attributes: {},
      }
    }
  }
);

module.exports = User;
