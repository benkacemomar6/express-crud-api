var {users,getUser} =require("../model/usermodel");
function getAllUsers(req,res){
    res.json(getUser);

}
function getuser(req,res){
    const id =req.params.id;

    const x=users.find(u=>u.id=id)
    if (!x){
       return res.status(404).json({"message":'user not found'})

    }
    res.json(x);
}
function addUser(req,res){
    const { name }=req.body;
    if (!name){
         return res.status(400).json({
            "message":"name required"
        });
    }
    const user={
        id:users.length+1,
        name:name
    }
    users.push(user);
    res.status(201).json(user);


}
function updateUser(req,res){
    const id=req.params.id;
    const user=users.find(u=>u.id==id);
    if(!user){
        return res.status(404).json({
            "message":"name required"
        });
    }
    user.name=req.body.name;
    res.send("user updated");


}
function deleteUser(req,res){
    const id=req.params.id;
    const user=users.find(u=>u.id==id);
     if(!user){
        return res.status(404).json({
            "message":"name required"
        });
    }
    users=users.filter(
        u=>u.id!=id
    )
    res.json({
        message: "User deleted"
    });


}
module.exports={
    getAllUsers,
    getuser,
    addUser,
    updateUser,
    deleteUser

}