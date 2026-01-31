const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(
  {origin: "*",
  path: "./.env"}
);
async function connectToDatabase(next) {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(()=>{
            console.log("Connected to MongoDB");
          })
          next()
        } catch (error) {
          console.error("Failed to connect to MongoDB:", error);
        }
}
module.exports = connectToDatabase;
