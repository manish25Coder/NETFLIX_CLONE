import bcrypt from "bcryptjs";
import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
    },
    image:{
        type:String
    },
    favourites:[{type:Schema.Types.ObjectId,ref:"Movie"}],
},{timestamps:true}
)

userSchema.pre("save",async function (){
     if(this.password && this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
     }
})

const User = models?.User || model("User",userSchema)

export default User;