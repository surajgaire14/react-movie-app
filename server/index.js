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
const { validateReviews } = require("./validation/ValidateReview");
const { validateUser } = require("./validation/validateUser");

app.post("/signup", validateUser, handleSignup);

app.get("/", validateToken, (req, res) => {
  res.json("Welcome to homePage,you are authenticated...");
});

app.post("/login", handleLogin);

app.get("/refresh", handleRefreshToken);

app.get("/logout", handleLogout);

app.post("/reviews", validateReviews, handleReview);

app.listen(port, () => {
  console.log(`server starting in port ${port}`);
});
