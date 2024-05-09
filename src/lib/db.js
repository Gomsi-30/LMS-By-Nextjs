import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO)
        if(connection){
            console.log("Connection is created")
        }
    } catch (error) {
        console.log("Not connected")
    }
   
}
export default connectDB;