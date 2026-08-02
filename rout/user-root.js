const express=require("express");
const router=express.Router();
const users=require("../model/usermodel")
const {getAllUsers,getuser,addUser,updateUser,deleteUser}=require("../contorlers/userController")
router.get("/",getAllUsers)
router.get("/:id",getuser);
router.post("/",addUser)
router.put("/:id",updateUser)
router.delete("/:id",deleteUser)
module.exports=router;