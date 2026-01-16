import { conectToDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github";


export const authOptions:AuthOptions={
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email:{
                    label:"Email",
                    type:"text"
                },
                password:{
                    label:"Password",
                    type:"password"
                }
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Email And Password is required");
                }
                try {
                    await conectToDB();
                    const user = await User.findOne({email:credentials.email})
                    if(!user){
                        throw new Error("user does Not Exist");
                    }

                    const isPasswordCorret=await bcrypt.compare(
                        credentials.password,
                        user.password
                    )

                    if(!isPasswordCorret){
                        throw new Error("Invalid Email Or Password");
                        
                    }
                    return user;
                } catch (error) {
                    throw error;
                }
            }
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!
        }),
        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID!,
            clientSecret:process.env.GITHUB_CLIENT_SECRET!
        })
    ],
    callbacks:{
        async signIn({user}) {
            try {
                await conectToDB();
                const existingUser = await User.findOne({email:user.email})

                if(!existingUser){
                    await User.create({
                        email:user.email,
                        name:user.name,
                        image:user.image
                    })
                }
            } catch (error) {
                console.log(error);
                return false; 
                
            }
            return true;
        },
    },
    pages:{
        signIn:"/login"
    },
    secret:process.env.AUTH_SECRET,
    session:{
        strategy:"jwt",
        maxAge:30 * 24 * 60 * 60 
    }
}