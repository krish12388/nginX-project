const express = require("express");
const { createServer } = require("node:http");
const path = require("node:path");
const { Server } = require("socket.io");
const userRoute = require("./routes/userRoute");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authenticate = require("./middleware/authenticate");
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cookieParser());
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
app.use("/user", userRoute);
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.get("/", authenticate, (req, res, next) => {
  res.render("home", { user: req.user });
});
app.get("/room", authenticate, (req, res) => {
  res.render("room", { user: req.user });
});
app.get("/arena", authenticate, (req, res) => {
  res.render("arena");
});
server.listen(3002, () => {
  console.log(`app is listening at port : 3002`);
});
