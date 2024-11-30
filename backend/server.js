const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const curdRoutes = require("./routes/curdRoutes");
const dotenv = require("dotenv");

const app = express();
dotenv.config();


app.use(
  cors({
    origin: "https://curd-mern-5ams0wh6w-manoj-kumars-projects-16f3983b.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",curdRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log("mongo connected ", err));

app.listen(5000, () => {
  console.log("server is running");
});
