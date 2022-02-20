const {User} = require("../models/Users")
const bcrypt = require("bcrypt");

const {createTokens,createRefreshToken} = require("../token/jwt")

const handleLogin = async(req,res) => {
    const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return res.status(401).json({ msg: "User doesn't exist..." });
  }

  bcrypt.compare(password, user.password).then((result) => {
    if (!result) {
      return res.status(401).json({ msg: "wrong email or password" });
    }

    // token is generated...
    const accessToken = createTokens(user);
    const accessRefreshToken = createRefreshToken(user);

    // res.cookie("access-token", accessToken, {
    //   maxAge: 1000 * 60 * 60 ,
    //   // expires:"",
    // httpOnly: true,
    // });

    res.cookie("refreshToken", accessRefreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    return res.status(200).json({
      auth: true,
      user: user.username,
      msg: "Logged in successfully...",
      accesstoken: accessToken,
      // refreshToken:accessRefreshToken
    });
  });
}

module.exports = handleLogin