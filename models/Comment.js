const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("postgres://user:pass@localhost:5432/dbname");

const Comment = sequelize.define("Comment", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Comment;
