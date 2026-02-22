const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer")
const { Client, GatewayIntentBits } = require("discord.js");
const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,"uploads/")
  },
  filename: (req,file,cb)=>{
    cb(null,`${Date.now()}-${file.originalname}`)
  }
});

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  
  if (message.content === "!ping") {
    message.reply("Pong!");
  }
});

client.login(process.env.DISCORD_TOKEN);

const upload = multer({storage:storage})
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.get("/",(req,res,next)=>{
  res.render("homepage")
})
app.post("/upload",upload.single("profileImage"), (req,res,next)=>{
  console.log(req.file)
  console.log(req.body);  // null value as we are not using express.urlencoded({extended:false})
  
  res.redirect("/")
})
app.listen(8001, () => {
  console.log("Server is running on port 8001");
});
