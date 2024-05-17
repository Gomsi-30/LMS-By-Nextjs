import connectDB from "@/lib/db";
import Users from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
export const POST = async(req)=>{
    await connectDB()
    const {name,email,password} = await req.json();

    // enter all fields
    if(!name || !email || !password){
        return NextResponse.json({message:"Enter all fields"},{staus:402})
    }

    // already exist
    const existuser = await Users.findOne({email})
    if(existuser){
        
        throw new Error("invalid")
    }

    // hashing password with bcrypt
    const hashPassword = await bcrypt.hash(password,10);

    // creating user
    const user = await Users.create({
       name,
       email,
       password:hashPassword
    })

    return NextResponse.json(user,{status:200})
}