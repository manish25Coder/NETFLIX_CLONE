import { conectToDB } from "@/lib/db";
import serverAuth from "@/lib/serverAutrh";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const {currentUser} = await serverAuth();
        // await conectToDB();
        return NextResponse.json({currentUser},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}