const express = require("express")
const handleLogin = require("../Controllers/handleLogin")
const handleLogout = require("../Controllers/handleLogout")
const handleReview = require("../Controllers/handleReviews")
const router = express.Router()
const handleSignup = require("../Controllers/handleSignup")
const { schema } = require("../schema/signupSchema")
const { handleRefreshToken, validateToken } = require("../token/jwt")
const {validateUser } = require("../validation/validateUser")

router.post("/signup",schema,validateUser,handleSignup)
router.get("/logout",handleLogout)
router.post("/login",handleLogin)
router.get("/refresh",handleRefreshToken) 
router.post("/reviews",handleReview)
router.get("/",validateToken,(req,res) => {
    res.json("Welcome to homePage,you are authenticated...");
})

module.exports = router