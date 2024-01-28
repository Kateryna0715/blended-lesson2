require("colors");
const express = require("express");
const path = require("path");
const configPath = path.join(__dirname, "..", "config", ".env");
const connectDb = require("../config/connectDb");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config({ path: configPath });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", require("./routes/carsRoutes"));

app.use(errorHandler);
const { PORT } = process.env;
connectDb();
app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`.green.bold);
});

// console.log("green".green.italic.bold);
// console.log("yellow".yellow.underline);
// console.log("red".red.bold);
// console.log(process.env.KATE);
// console.log(process.env.PORT);
// console.log(process.env.DB_STRING);
