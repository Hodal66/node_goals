//@ desc Get Goals
//@Route Get api/goals
//@access  Private
const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const getGoals = asyncHandler(async (req, res, next) => {
  const goals = await Goal.find();
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
  const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
  if (deletedGoal) {
    return res.status(200).json({
      message: "Deleted successfully",
    });
  }
});
module.exports = {
  getGoals,
  deleteGoals,
  updateGoals,
  setGoals,
};
