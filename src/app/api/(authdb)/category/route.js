import connectDB from "@/lib/db";
import Category from "@/models/category";
import { NextResponse } from "next/server";

export async function GET(req) {
    await connectDB();
    try {
      const categories = await Category.find({}).sort({ name: -1 }); // 1 for ascending order
      return NextResponse.json(categories,{status:200});
    } catch (error) {
      return NextResponse.json({ message: "Failed to fetch categories", error: error.message });
    }
}