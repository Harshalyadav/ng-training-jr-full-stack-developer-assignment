const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  assignedTo: String,
  status: String,
  dueDate: {
    type: Date, 
    required: true,
  },
  priority: String,
  comments: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
