const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./configs/database");

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

// after -middleware (after)

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
