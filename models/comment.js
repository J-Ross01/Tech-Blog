const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,  
      references: {
        model: 'user',
        key: 'id'
      }
    },
  
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,  
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true, 
    freezeTableName: true,
    underscored: true,
    modelName: 'Comment', 
    tableName: 'comments' 
  }
);

module.exports = { Comment };
