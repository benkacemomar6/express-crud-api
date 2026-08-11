const express=require("express");
const router=express.Router();
const users=require("../model/usermodel");
const {getAllUsers,getuser,addUser,updateUser,deleteUser, signup,login}=require("../contorlers/userController")
const auth=require("../mideleware/auth")
router.get("/",auth,getAllUsers)
router.get("/:id",auth,getuser);
router.post("/",auth,addUser)
router.put("/:id",auth,updateUser)
router.delete("/:id",auth,deleteUser)
router.post("/login",login)
router.post("/signup",signup)

module.exports=router;