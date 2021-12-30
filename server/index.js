const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const jwt = require("jsonwebtoken")
const {createTokens,validateToken}= require("./token/jwt")


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
    // key: "userID",
    resave: false,
    saveUninitialized: false,
    secret: "hugeSecretForMyMovieApp",
    cookie: {
      expires: 180000,
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
    
    return res.status(200).json({ msg: "user created successfully..." });
  }
);

app.get("/login", (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ isLoggedIn: true, user: req.session.user });
  } else {
    return res.json({ isLoggedIn: false });
  }
});

// const verifyToken = (req,res,next) => {
//   const token = req.headers["x-access-token"]
//   console.log(req.headers)
//   if(!token){
//     return res.send("We need a token...")
//   }else {
//     jwt.verify(token,"mySecretKeyForMyMovieApp",(err,decoded) => {
//       if (err)
//      return res.json({auth:false,msg:"You failed to authenticate"})
//       else{
//         req.userId = decoded.id
//         console.log(decoded.id)
//         next()
//       } 

//     })
//   }
// }

// app.get("/isUserAuth",verifyToken,(req,res) => {
//   return res.send("You are authenticated")
// })

app.get("/",validateToken,(req,res) => {
  res.json("Welcome to homePage,you are authenticated...")
})

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

    const accessToken = createTokens(user)

    res.cookie("access-token",accessToken,{
      maxAge:1000 * 60
    })

    //  res.send({auth:true,token:token,user:user})

     return res.status(200).json({ msg: "Logged in successfully..." });
  });
});

app.listen(port, () => {
  console.log(`server starting in port ${port}`);
});
