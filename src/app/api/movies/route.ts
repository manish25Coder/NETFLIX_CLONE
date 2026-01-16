import { conectToDB } from "@/lib/db";
import serverAuth from "@/lib/serverAutrh";
import Movie from "@/models/Movie";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await serverAuth();
        await conectToDB();
        const movies = await Movie.find({})
        return NextResponse.json(movies,{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Failed to Fetch movies"},{status:500})
    }
    
}