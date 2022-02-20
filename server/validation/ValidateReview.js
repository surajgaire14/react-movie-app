const { check, validationResult } = require("express-validator");

exports.validateReviews = [
  check("reviews").isString().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.array()) {
      res.status(422).json({ errors: errors.array() });
      next();
    }
  },
];
