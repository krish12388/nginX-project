const express = require("express");
const path= require("node:path")
const app = express()
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"views"));
app.get('/',(req,res,next)=>{
  res.render("home");
})

app.listen(3002,()=>{
  console.log(`app is listening at port : 3002`);
  
})