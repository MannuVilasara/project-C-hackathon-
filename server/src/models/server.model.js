import mongoose from 'mongoose';

const serverSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    serverIP:{
        type:String,
        required:true,
        unique:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
},{timestamps:true})



const Server=mongoose.model('Server',serverSchema)
export default Server