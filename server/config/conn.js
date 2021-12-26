const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("moviedb", "root", "7227", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .sync()
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
  sequelize
};
