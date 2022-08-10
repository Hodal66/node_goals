const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

//@ desc Get Goals
//@Route Get api/goals
//@access  Private
const getGoals = asyncHandler(async (req, res, next) => {
  const goals = await Goal.find({
    user: req.user.id,
  });
  res.status(200).json({
    message: goals,
  });
});

//@ desc set Goal
//@Route Post api/goals
//@access  Private
const setGoals = asyncHandler(async (req, res, next) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please Insert somethingddddd !!");
  }

  const createGoal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json({
    message: createGoal,
  });
});

//@ desc update Goals
//@Route Put api/goals
//@access  Private
const updateGoals = asyncHandler(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400).json({
      // message: `We can not find corresponding Id Of ${req.params.id} `,
      message: "can't find id",
    });
  }

  const user = await User.findById(req.user.id);

  //check if the user exits!!

  if (!user) {
    res.status(401).json({
      success: fail,
      message: "OOPs User not Found!!!",
    });
  }
  //Make sure the logged in user matches the goals

  if (goal.user.toString() !== user.id) {
    res.status(401).json({
      success: false,
      message: "User not authorized!!!",
    });
  }
  const updateMyGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (updateMyGoal) {
    res.status(200).json({
      message: "Goals Updated successfully",
    });
  }
});

//@ desc delete Goals
//@Route delete api/goals
//@access  Private
const deleteGoals = asyncHandler(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    return res.status(400).json("No id found please try again");
  }

  const user = await User.findById(req.user.id);

  //check if the user exits!!

  if (!user) {
    res.status(401).json({
      success: fail,
      message: "OOPs User not Found!!!",
    });
  }
  //Make sure the logged in user matches the goals

  if (goal.user.toString() !== user.id) {
    res.status(401).json({
      success: false,
      message: "User not authorized!!!",
    });
  }
});
module.exports = {
  getGoals,
  deleteGoals,
  updateGoals,
  setGoals,
};
