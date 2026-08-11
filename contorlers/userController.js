var {getUser} =require("../model/usermodel");
const{client}=require("../gonfig/db")
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt")
const auth=require("../mideleware/auth")
async function signup(req,res) {
    const {name,pass}=req.body
    if (name.trim()==""){
        res.status(400).json({
            "message":"name required"
        });
    }
    if (pass.trim()==""){
        res.status(400).json({
            "message":"pass invalid"
        });
    }
    const hashedPassword = await bcrypt.hash(pass, 10);
    
  
    
  const newUser=await client.db("test").collection("users").insertOne({name:name,
    pass:hashedPassword
  });
    res.status(201).json(newUser);


    
}
async function login(req,res) {
   const  {name,pass}=req.body;
   const user=await  client.db("test").collection("users").findOne({name:name});
   if (!user){
    res.status(404).json({
        "message":"user not found"
    });
   }
   else{

    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    if (!isPasswordValid){
      res.status(404).json({
        "message":"user not found"
    });
        
    } 
    
          const token = jwt.sign(
            { id:user._id  },
            "mySecretKey",
            { expiresIn: "1h" }
        );
    res.json(token)
}


    
}



async function getAllUsers(req,res){
    const userId=req.user.id;
const users=await client.db("test").collection("users").find().toArray();

    res.json(users);

}
async function getuser(req,res){
    const id =req.params.id;

    const user=await client.db("test").collection("users").findOne({_id: new ObjectId(id)});
    if (!user){
       return res.status(404).json({"message":'user not found'})

    }
    res.json(user);
}
async function addUser(req,res){
    const { name }=req.body;
    if (!name){
         return res.status(400).json({
            "message":"name required"
        });
    }
  const newUser=await client.db("test").collection("users").insertOne({name:name});
    res.status(201).json(newUser);


}
async function updateUser(req,res){
    const id=req.params.id;
    const user=await client.db("test").collection("users").findOne({_id: new ObjectId(id)});
    if(!user){
        return res.status(404).json({
            "message":"name required"
        });
    }
    const newName=req.body.name;
    await client.db("test").collection("users").updateOne({_id: new ObjectId(id)}, {$set: {name: newName}});
    res.send("user updated");


}
async function deleteUser(req,res){
    const id=req.params.id;
    const user=await client.db("test").collection("users").findOne({_id: new ObjectId(id)});
     if(!user){
        return res.status(404).json({
            "message":"name required"
        });
    }
    await client.db("test").collection("users").deleteOne({_id: new ObjectId(id)});
    res.json({
        message: "User deleted"
    });


}
module.exports={
    getAllUsers,
    getuser,
    addUser,
    updateUser,
    deleteUser,
    signup,
    login

}