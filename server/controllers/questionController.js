// /server/controllers/questionController.js
const Question = require("../models/Question");

exports.submitQuestion = async (req, res) => {
  const question = await Question.create({ ...req.body, submittedBy: req.user._id });
  res.json(question);
};

exports.getQuestions = async (req, res) => {
  const { company, difficulty } = req.query;
  const filter = { approved: true };
  if (company) filter.company = company;
  if (difficulty) filter.difficulty = difficulty;

  const questions = await Question.find(filter);
  res.json(questions);
};

exports.approveQuestion = async (req, res) => {
  await Question.findByIdAndUpdate(req.params.id, { approved: true });
  res.json({ msg: "Approved" });
};

exports.deleteQuestion = async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};

exports.getPendingQuestions = async (req, res) => {
  const questions = await Question.find({ approved: false }).populate("author", "name");
  res.json(questions);
};
