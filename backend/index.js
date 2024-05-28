const express=require("express");
var app=express();
//const path=require("path");
const port=5000;
const mongo = require("./db");
const cors = require("cors");
mongo();

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );

app.get('/',(req,res)=>{
    res.send("Hello World");
    res.end();
})
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/Admin"));


app.listen(port,()=>{
    console.log(`Food-Deliver-App is listening at ${port}`);
})
