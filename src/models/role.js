

import mongoose from "mongoose"

const roleSchema = new mongoose.Schema({
    role:{
        type:String,
        requied:true
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    }],   
})
const Role = mongoose.models.Role || mongoose.model("Role",roleSchema)
export default Role;