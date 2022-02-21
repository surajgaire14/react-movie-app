const {check} = require("express-validator")

const schema = [
    check("username").isString().notEmpty().isLength({ min: 3, max: 20 }),
    check("email")
      .notEmpty()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    check("password").isLength({ min: 3, max: 20 }),
    check("cpassword").isLength({ min: 3, max: 20 }),
]

module.exports = { schema }