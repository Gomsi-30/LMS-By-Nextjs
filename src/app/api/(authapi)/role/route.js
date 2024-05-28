import connectDB from "@/lib/db";
import Role from "@/models/role";
import Users from "@/models/user";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
 

export async function POST(req) {
    try {
        await connectDB();
        const { role } = await req.json();
        const session = await auth()
        const email = session.user.email
        console.log(email)
        if (!role) {
            return NextResponse.json({ error: "Role is required" }, { status: 400 });
        }

        const ans = await Role.create({role});
        console.log(ans)
        if (ans) {
             const res = await Users.findOne({email},{role:ans._id},{new:true}).populate("role")
             console.log(res)
             return NextResponse.json(res);
        } else {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error updating role:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
