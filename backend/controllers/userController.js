const express = require("express");
const jwt = require("jsonwebtoken");
const bcryt = require("bcryptjs");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//@ desc create User
//@Route Post api/users
//@access  public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please all fields are required!!",
    });
  }

  //check if the user exist

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      message: "User alread exists",
    });
  }

  const salt = await bcryt.genSalt(10);
  const hashedPassword = await bcryt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@ desc Authonticate a User
//@Route Post api/users/login
//@access  private
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("Entered::::", req.body);

  const user = await User.findOne({ email });
  console.log("Find one return::: ", user);

  if (user && (await bcryt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credatials");
  }
});

//@ desc Get user Data
//@Route Get api/users/me
//@access  public
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});
//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
