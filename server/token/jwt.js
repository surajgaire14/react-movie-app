const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/Users");

const createTokens = (user) => {
  const accessToken = sign(
    {
      username: user.username,
      id: user.id,
    },
    process.env.secretKey,
    { expiresIn: "30s" }
  );
  return accessToken;
};

const createRefreshToken = (user) => {
  const refreshToken = sign(
    {
      username: user.username,
      id: user.id,
    },
    process.env.refreshSecretKey,
    { expiresIn: "1d" }
  );
  return refreshToken;
};

// const validateToken = (req, res, next) => {
//   const accesstoken = req.cookies["accesstoken"];
//   // console.log(accesstoken);
//   // const accesstoken = req.headers['authorization']
//   // const accesstoken = req.cookies
//   // console.log(accesstoken)

//   // const accesstoken = res.headers["authorization"]
//   // if(accesstoken){
//   //     const accesstoken = accesstoken.split(" ")
//   //    accesstoken = accesstoken[1]
//   // }
//   // console.log(accesstoken)
//   // const refreshToken = req.cookies["refresh-token"]

//   if (!accesstoken) {
//     return res.status(400).json({ error: "User not authenticated..." });
//   }
//   try {
//     const validAccessToken = verify(accesstoken, process.env.secretKey);
//     // const validRefreshToken = verify(refreshToken,process.env.refreshSecretKey)
//     if (validAccessToken) {
//       req.auth = true;
//       return next();
//     }
//   } catch (err) {
//     return res.status(400).json({ error: err });
//   }
// };

// const validateToken = (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.includes("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = verify(token, process.env.secretKey);
//       if (decoded) {
//         req.username = decoded.username;
//         next();
//       }
//     } catch (err) {
//       return res.status(400).json({ error: err });
//     }
//   }
//   if (!token) {
//     res.status(401).json("token not found,not authorized...");
//   }
// };

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "token not found,forbidden..." });
  }
  const token = authHeader.split(" ")[1];
  const decoded = verify(token, process.env.secretKey);
  if (decoded) {
    req.username = decoded.username;
    next();
  }
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.refreshToken) {
    return res.sendStatus(401).json({ error: "token not found,forbidden..." });
  }
  const refreshToken = cookies.refreshToken;

  // const foundUser = await User.findOne({ where: { email: req.body.email } });
  if (refreshToken) {
    // if (!foundUser) {
    //   return res.status(401).json({ error: "user not found..." });
    // }
    const decoded = verify(refreshToken, process.env.refreshSecretKey);
    console.log(decoded);
    if (decoded) {
      const accessToken = sign(
        { username: decoded.username,
           id: decoded.id },
        process.env.secretKey,
        { expiresIn: "30s" }
      );
      return res.json({ accessToken });
    }
  }
};

// const validateToken = (req,res,next) => {
//   let token = req.headers.authorization.split(" ")[1]

//   if(!token){
//     res.status.json({error:"token not found,not authenticated..."})
//   }else {

//   }
// }

module.exports = {
  createTokens,
  validateToken,
  createRefreshToken,
  handleRefreshToken,
};

// "mySecretKeyForMyMovieApp"
