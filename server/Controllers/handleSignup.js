const {User} = require("../models/Users")
const bcrypt = require("bcrypt")
const {schema } = require("../validation/validateUser")
const joi = require("joi")

const handleSignup = async (req,res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedConfirmPassword = await bcrypt.hash(req.body.cpassword, salt);

    if (hashedPassword !== hashedConfirmPassword) {
      return res
        .status(401)
        .json({ msg: "Password and confirm password doesnot match" });
    }

    const emailExist = await User.findOne({ where: { email: req.body.email } });
    if (emailExist) {
      return res.status(401).json({ message: "Email already registered..." });
    }

    // const result = await schema.validateAsync(req.body)
    // console.log(result)

    // const result = 
    // const errors = validationResult(req);
    // console.log(errors);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      cpassword: hashedConfirmPassword,
    });

    return res.status(200).json({ msg: "user created successfully..." });
}

module.exports = handleSignup


