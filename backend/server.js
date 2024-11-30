const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const curdRoutes = require("./routes/curdRoutes");
const dotenv = require("dotenv");

const app = express();
app.use(dotenv());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(curdRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log("mongo connected ", err));

app.listen(5000, () => {
  console.log("server is running");
});
