const express = require("express")
const router = express.Router()
const handleSignup = require("../Controllers/handleSignup")
const { validateUser } = require("../validation/validateUser")
// console.log(validateUser)

router.post("/signup",validateUser,handleSignup)
// router.post("/",handleSignup)
// router.route("/").post(validateUser,handleSignup)

module.exports = router