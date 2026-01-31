const express = require("express");
const router = express.Router();
const { createHmac } = require('node:crypto');
const User = require("../modals/usermodal");
const dotenv = require("dotenv");
dotenv.config({ origin: "*", path: "./.env" });
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

 const hashedPassword = createHmac("sha256", process.env.SECRET_KEY)
  .update(password)
  .digest("hex");

const existingUser = await User.findOne({ email });

if (!existingUser) return res.redirect("/user/signup");

if (existingUser.password !== hashedPassword) {
  return res.redirect("/user/login");
}
else return res.redirect("/");
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    if(user){
      console.log("User created successfully");
      return res.status(200).redirect("/user/login");
    }
    else{
      console.log("User creation failed");
      return res.status(401).redirect("/user/signup");
    }
    
});
module.exports = router;