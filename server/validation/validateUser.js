const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check("username").isString().notEmpty().isLength({ min: 3, max: 20 }),
  check("email")
    .notEmpty()
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false }),
  check("password").isLength({ min: 3, max: 20 }),
  check("cpassword").isLength({ min: 3, max: 20 }),
  (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.array()) {
      res.status(422).json({ errors: errors.array() });
      next();
    }
  },
];
