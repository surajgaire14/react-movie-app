const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(
  session({
    key: "userID",
    resave: false,
    saveUninitialized: false,
    secret: "hugeSecretForMyMovieApp",
    cookie: {
      expires: 60 * 60 * 24,
      // secure:true
    },
  })
);

const port = process.env.PORT || 5000;

const bcrypt = require("bcrypt");

const { check, validationResult } = require("express-validator");

const { User } = require("./models/Users");

app.post(
  "/signup",
  [
    check("username").isString().notEmpty().isLength({ min: 3, max: 20 }),
    check("email").notEmpty().isEmail().normalizeEmail(),
    check("password").isLength({ min: 3 }),
    check("cpassword").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedConfirmPassword = await bcrypt.hash(req.body.cpassword, salt);

    const emailExist = await User.findOne({ where: { email: req.body.email } });
    if (emailExist) {
      return res.status(401).json({ message: "Email already registered..." });
    }

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      cpassword: hashedConfirmPassword,
    });
    res.status(200).json({ msg: "user created successfully..." });
  }
);

app.get("/", (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ isLoggedIn: true, user: req.session.user });
  } else {
    return res.json({ isLoggedIn: false });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return res.status(401).json({ msg: "User doesn't exist..." });
  }

  bcrypt.compare(password, user.password).then((result) => {
    if (!result) {
      return res.status(401).json({ msg: "wrong email or password" });
    }
    req.session.user = user;
    console.log(req.session.user);
    return res.status(200).json({ msg: "Logged in successfully..." });
  });
});

app.listen(port, () => {
  console.log(`server starting in port ${port}`);
});
