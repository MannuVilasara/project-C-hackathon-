import Server from "../models/server.model.js";

export const addServer=async(req,res)=>{
    try{
        const {name,serverIP}=req.body;
        const userId=req.user;

        if(!name || !serverIP){
            return res.status(400).json({message:"All fields are required"})
        }

        const existingServer=await Server.findOne({serverIP});
        if(existingServer){
            return res.status(400).json({message:"Server with this IP already exists"})
        }

        const newServer=new Server({
            name,
            serverIP,
            user:userId
        })
        await newServer.save();
        res.status(201).json({message:"Server added successfully",server:newServer})
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"})
    }
}


export const getUserServers=async(req,res)=>{
    try{
        const userId=req.user;
        const servers=await Server.find({user:userId});
        res.status(200).json({servers});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"})
    }
}


export const deleteServer=async(req,res)=>{
    try{
        const userId=req.user;
        const serverId=req.params.id;

        const server=await Server.findOne({_id:serverId,user:userId});
        if(!server){
            return res.status(404).json({message:"Server not found"})
        }
        await Server.deleteOne({_id:serverId});
        res.status(200).json({message:"Server deleted successfully"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"})
    }
}