import { conectToDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await conectToDB();
        const {name,email,password}=await req.json();

        if(!name || !email || !password){
            return NextResponse.json(
                {message:"All Fileds are required"},
                {status:400}
            )
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return NextResponse.json(
                {message:"Email Already Taken"},
                {status:400}
            )
        }

        await User.create({name,email,password});
        return NextResponse.json(
            {message:"User register Successfully"},
            {status:201}
        )
    } catch (error) {
        console.log(error);
        return NextResponse.json(
             {message:"Internal Server Error"},
            {status:500}
        )
    }
}