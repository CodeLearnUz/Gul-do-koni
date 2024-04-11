const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("postgres://user:pass@localhost:5432/dbname");

const Order = sequelize.define("Order", {
  FIO: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
});

module.exports = Order;
