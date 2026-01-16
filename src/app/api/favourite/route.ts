import { conectToDB } from "@/lib/db";
import serverAuth from "@/lib/serverAutrh";
import Movie from "@/models/Movie";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const {currentUser}=await serverAuth();
        await conectToDB();
        const {movieId} = await req.json();
        const isMovieExits=await Movie.findById(movieId)

        if(!isMovieExits){
            return NextResponse.json({message:"Invalid Movie ID"},{status:400})
        }
        await User.updateOne(
            {email:currentUser.email},
            {$addToSet:{favourites:movieId}}
        )
        return NextResponse.json({messsage:"Movie Added to favourites"},{status:200})

    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Internal Server Error"},{status:500})
        
    }
}

export async function DELETE(req:NextRequest) {
    try {
        const {currentUser}=await serverAuth();
        await conectToDB();
        const {movieId} = await req.json();
        const isMovieExits=await Movie.findById(movieId)

        if(!isMovieExits){
            return NextResponse.json({message:"Invalid Movie ID"},{status:400})
        }

        await User.updateOne(
            {email:currentUser.email},
            {$pull:{favourites:movieId}}
        )

        return NextResponse.json({messsage:"Movie Deleted from favourites"},{status:200})

    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Internal Server Error"},{status:500})
        
    }
}