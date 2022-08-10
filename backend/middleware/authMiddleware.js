const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from headers
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      //how to get user from token
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    return res.status(401).json("Please provide token");
  }
});
module.exports = { protect };
