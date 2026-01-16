import { conectToDB } from "@/lib/db";
import serverAuth from "@/lib/serverAutrh";
import User from "@/models/User";
import {  NextResponse } from "next/server";

export async function GET() {
    try {
         await conectToDB();
        const {currentUser} = await serverAuth();
       
        const user=await User.findOne({email:currentUser.email}).populate("favourites")
        return NextResponse.json({favourites:user.favourites},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Internal Server Error"},{status:500})
        
    }
}