const Task = require("../models/task");
const mongoose = require("mongoose");


exports.add = (req, res) => {
  const task = new Task({
    assignedTo: req.body.assignedTo,
    status: req.body.status,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    comments: req.body.comments,
  });
  task.save().then((result) => {
    res.status(201).json({
      status: true,
      code: 201,
      message: "Task is successfully uploaded!",
      task: result,
    });task
  });
};

exports.delete = (req, res, next) => {
    Task.findOneAndRemove({ _id: req.params.id }, function (err, docs) {
    if (err) {
      res.status(400).json({
        status: false,
        code: 500,
        message: "Internal Server Error",
      });
    } else {
      if (!docs) {
        res.status(409).json({
          status: false,
          code: 409,
          message: " Id Not Found!",
        });
      } else {
        res.status(200).json({
          status: true,
          code: 200,
          message: "Task Deleted",
        });
      }
    }
  });
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    var newvalues = { $set: { ...req.body } };
    const olddata = await Task.findById(id);
    Task.updateOne(olddata, newvalues).then(async () => {
      const result = await Task.findById(id);
      return res.send({
        status: true,
        code: 202,
        message: "Task Updated",
        task: result,
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      code: 500,
      message: "Internal Server Error",
      error: err,
    });
  }
};



exports.one = (req, res, next) => {
  try {
    const id = req.params.id;
    Task.findOne({ _id: id }).then((result) => {
      return res.status(200).json({
        status: true,
        code: 200,
        city: result,
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      code: 500,
      message: "Internal Server Error",
      error: err,
    });
  }
};

exports.view = (req, res, next) => {
    Task.find().then((result) => {
    return res.status(200).json({
      status: true,
      code: 200,
      count:result.length,
      message: "All task",
      task: result,
    });
  });
};


