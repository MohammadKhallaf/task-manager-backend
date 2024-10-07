const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
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
app.use(cors());
app.use(helmet());
app.use(express.json()); // json parser --> body
// before continue to the routes

// routes
// [ --- ]
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// after -middleware (after)

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
