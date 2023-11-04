const fs=require("fs");
const path=require("path");
const express = require("express");


const app = express();
app.use(express.urlencoded({extended:false}));

app.get("/currenttime", (request,response)=>{
    response.send("<h1>"+new Date()+"</h1>");
});

app.get("/",(req,res)=>{
    res.send("<form action=\"/store-user\" method=\"POST\"><label>Your Name: </label><input type=\"text\" name=\"username\"></input><button>Submit</button></form>");
});

app.post("/store-user",(request,response)=>{
    const username=request.body.username;
    console.log(username);
    const filePath=path.join(__dirname, "data", "user.json");
    const fileData=fs.readFileSync(filePath);
    const existingUsers =JSON.parse(fileData);

    existingUsers.push(username);

    fs.writeFileSync(filePath,JSON.stringify(existingUsers));
    response.send("<h1>Username Stored!</h1>");
});

app.get("/users",(req,res)=>{
    const filePath=path.join(__dirname, "data", "user.json");
    const fileData=fs.readFileSync(filePath);
    const existingUsers =JSON.parse(fileData);
    let responseData="<ul>";
    for(const user of existingUsers){
        responseData+=("<li>"+user+"</li>");
    }
    responseData+="</ul>";
    res.send(responseData);
});

app.listen(3000);