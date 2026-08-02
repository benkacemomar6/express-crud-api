const esxpres=require('express');
const app=esxpres();
app.use(esxpres.json());
const logger=require("./mideleware/logger")

const userRouter=require("./rout/user-root")
app.use(logger);



app.use("/users",userRouter);
app.get("/",(req,res)=>{

    res.send('home page')
})
app.listen(3000,()=>{
    console.log("server runinng");
})

