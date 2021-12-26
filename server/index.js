const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const bcrypt = require("bcrypt");
const saltRounds = 10;

const { check, validationResult } = require("express-validator");

const { User } = require("./models/Users");

app.post(
  "/signup",
  [
    check("username").isString().notEmpty().isLength({ min: 3, max: 20 }),
    check("email").notEmpty().isEmail().normalizeEmail(),
    check("password").isLength({min:3}),
    check("cpassword").isLength({min:3})
  ],
  async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedConfirmPassword = await bcrypt.hash(req.body.cpassword,salt)
    console.log(salt)
    console.log(hashedPassword)
    console.log(hashedConfirmPassword)
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      cpassword: hashedConfirmPassword,
    });
  }
);

app.post("/login", async (req, res) => {
  const userDetails = await User.findOne({
    where: { email: req.body.email, password: req.body.password },
  });
  if (userDetails) {
    res.send({ msg: "Login successful" }).status(200);
  } else {
    res.status(401).json({ message: "Username or password doesnt match" });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server starting in port ${port}`);
});
