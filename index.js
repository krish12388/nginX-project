const express = require("express");
const path = require("node:path");
const userRoute = require("./routes/userRoute");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config({ path: "./.env" }); 
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.get("/", (req, res, next) => {
  res.render("home");
});
app.use("/user", userRoute);
app.listen(3002, () => {
  console.log(`app is listening at port : 3002`);
});
