const {Schema,model} = require("mongoose");
const { createHmac } = require('node:crypto');
const dotenv = require("dotenv");
dotenv.config({ origin: "*", path: "./.env" });
const userSchema = new Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  }
})
userSchema.pre("save", async function(){
  try{
    if(this.isModified("password")){
      const user = this
      const password=user.password;
      user.password = await createHmac("sha256",process.env.SECRET_KEY).update(password).digest("hex");
    }
  }
catch(err){
  console.log(err);
}
})

const User = model("User",userSchema)
module.exports = User
