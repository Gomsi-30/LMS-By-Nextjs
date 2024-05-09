import { NextResponse } from "next/server";

export const POST = async(req)=>{
    const {name,email,password} = req.json();

    // enter all fields
    if(!name || !email || !password){
        return NextResponse.json({},{staus:402})
    }

    // already exist
    const user = await User.findOne({email})
    if(user){
        return NextResponse.json({},{staus:402})
    }

    // hashing password with bcrypt
    const hashPassword = await bcrypt.hash(password,10);

    // creating user
    const newUser = await User.create({
       name,
       email,
       password:hashPassword
    })

    return NextResponse.json(newUser,{status:200})
}