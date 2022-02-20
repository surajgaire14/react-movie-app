const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const handleLogout = require("./Controllers/handleLogout");
const handleSignup = require("./Controllers/handleSignup");
const handleLogin = require("./Controllers/handleLogin");

const { validateToken, handleRefreshToken } = require("./token/jwt");

// const router = require("./router/route")
const signup = require("./router/route")

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
    exposedHeaders: "Authorization",
  })
);

const port = process.env.PORT || 5000;

const handleReview = require("./Controllers/handleReviews");

app.use("/",signup)

app.get("/", validateToken, (req, res) => {
  res.json("Welcome to homePage,you are authenticated...");
});

// app.post("/login", handleLogin);
app.route("/login").post(handleLogin)

// app.get("/refresh", handleRefreshToken);
app.route("/refresh").get(handleRefreshToken)

// app.get("/logout", handleLogout);
app.route("/logout",handleLogout)

// app.post("/reviews", validateReviews, handleReview);
app.route("/reviews").post(handleReview)

app.listen(port, () => {
  console.log(`server starting in port ${port}`);
});
