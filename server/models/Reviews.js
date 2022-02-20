const {DataTypes} = require("sequelize")
const {sequelize} = require("../config/conn")

const Review = sequelize.define("review",{
    review:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = { Review }