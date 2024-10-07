const express = require("express");
const taskController = require("./task-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

// crud
router.use(authMiddleware);

router.post("/", taskController.createTask);
router.get("/:id", taskController.getTask);
router.get("/", taskController.getTasks);
router.patch("/", taskController.updateTask);
router.delete("/", taskController.deleteTask);

module.exports = router;
