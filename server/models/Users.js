const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/conn");

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpassword: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// (async() => {
//   await sequelize.sync({force:true})
// })

module.exports = { User };
