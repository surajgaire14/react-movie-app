const {  validationResult } = require("express-validator");

const validateUser = (req,res,next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(422).json({errors:errors.array()})
  }
  next()
}

module.exports = {validateUser}
