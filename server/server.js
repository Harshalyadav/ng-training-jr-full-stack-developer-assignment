const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const path = require("path");


mongoose.connect('mongodb://localhost:27017/taskAssigment').then(() => console.log('Connected!'));



mongoose.Promise = global.Promise;

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Expose-Headers");
  next()
});

const taskRoutes = require("./src/routes/task");


app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/", taskRoutes);


app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
