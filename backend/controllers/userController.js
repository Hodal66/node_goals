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
  try {
    //chec iof user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    //hashed password
    const salt = await bcryt.genSalt(10);
    const hashedPassword = await bcryt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (user) {
      return res.status(201).json({
        success: true,
        message: {
          _id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    return res.status(400);
    throw new Error("User creation failed");
  }
});
//@ desc Authonticate a User
//@Route Post api/users/login
//@access  private
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "loginUser successfullly",
  });
});

//@ desc Get user Data
//@Route Get api/users/me
//@access  public
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "User Data",
  });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
