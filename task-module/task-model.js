const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["todo", "in_progress", "completed"],
      default: "todo",
    },
    user: {
      //reference
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamp: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
