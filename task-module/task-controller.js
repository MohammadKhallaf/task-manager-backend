const Task = require("./task-model");
// CRUD

// POST || -> |{authorized} ->| request
exports.createTask = async (request, response) => {
  try {
    const data = request.body;

    const task = await Task.create({ ...data, user: request.user._id });

    response.status(201).json(task);
  } catch (error) {
    response.status(400).json(error);
  }
};

// list all

exports.getTasks = async (request, response) => {
  try {
    const tasks = await Task.find({ user: request.user._id }); // []

    response.status(200).json(tasks);
  } catch (error) {
    response.status(500).json({ message: "Something went wrong!" });
  }
};

// list one
exports.getTask = async (request, response) => {
  try {
    const task = await Task.findOne({
      _id: request.params.id,
      user: request.user._id,
    });
    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }
    response.status(200).json(task);
  } catch (error) {
    response.status(500).json({ message: "Something went wrong!" });
  }
};

// PATCH (/:id)
exports.updateTask = async (request, response) => {
  try {
    const data = request.body;

    const task = await Task.findOneAndUpdate(
      { _id: request.params.id, user: request.user._id },
      data,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }
    response.status(200).json(task);
  } catch (error) {
    response.status(400).json(error);
  }
};

exports.deleteTask = async (request, response) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: request.params.id,
      user: request.user._id,
    });
    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }
    response.status(200).json({ message: "Task deleted!" });
  } catch (error) {
    response.status(500).json({ message: "Something went wrong!" });
  }
};
