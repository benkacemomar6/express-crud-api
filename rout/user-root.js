const express=require("express");
const router=express.Router();
let users = [
    {
        id: 1,
        name: "Omar"
    },
    {
        id: 2,
        name: "Ali"
    }
];
router.get("/",(req,res)=>{
    res.json(users);


})
router.get("/:id",(req,res)=>{
    const id =req.params.id;

    const x=users.find(u=>u.id=id)
    if (!x){
       return res.status(404).json({"message":'user not found'})

    }
    res.json(x);
})
router.post("/",(req,res)=>{
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

})
router.put("/:id",(req,res)=>{
    const id=req.params.id;
    const user=users.find(u=>u.id==id);
    if(!user){
        return res.status(404).json({
            "message":"name required"
        });
    }
    user.name=req.body.name;
    res.send("user updated");


})
router.delete("/:id",(req,res)=>{
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

})
module.exports=router;