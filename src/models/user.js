import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requied:true
    },
     email:{
        type:String,
        requied:true
    },
     password:{
        type:String, 
        
    },
     googleId:{
        type:String,
    }
})
const Users = mongoose.models.Users || mongoose.model("Users",userSchema)
export default Users;