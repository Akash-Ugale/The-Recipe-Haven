import mongoose from "mongoose"; 


// Define the schema for "User" collection
const userSchema = new mongoose.Schema({
    name : {type :String, require :true},
    gmail : {type: String, reuire : true},
    password :{type:String, require : true},
});


// create a user model  from the schema
export const User = mongoose.model("User",userSchema);

