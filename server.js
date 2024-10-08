const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./configs/database");
const userRoutes = require("./user-module/user-routes");
const taskRoutes = require("./task-module/task-routes");

dotenv.config();
const app = express();

// configurations
const PORT = process.env.PORT ?? 5000;
// connect database

connectDB();

//  pre-middlewares
// before continue to the routes
app.use(cors());
app.use(helmet());
app.use(express.json()); // json parser --> body
app.use(morgan("dev"));

// routes
// [ --- ]
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Task Management Backend is up and running!");
});

// after -middleware (after)

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
