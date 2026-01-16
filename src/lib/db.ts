import mongoose from "mongoose";


const MONGO_URI=process.env.MONGODB_URL!;
if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in .env.local");
}

//connect To DB()
let cached = global.mongoose

if(!cached){
    cached = global.mongoose = {conn : null, promise:null};

}

async function conectToDB(){
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGO_URI,{
             bufferCommands:true,
             maxPoolSize:10,
        })
        .then(()=>mongoose.connection)
    }
    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null;
        throw error
    }
    return cached.conn;
}

export{conectToDB}