// const { json } = require("body-parser");
const express=require("express");
const fs = require("fs");
const path = require("path");

const app=express();

const filePath=path.join(__dirname,"views");

app.set("views",filePath);
app.set("view engine","ejs");

app.use(express.static("frontend-site"));
app.use(express.urlencoded({extended:false}));


app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/restaurants",(req,res)=>{
    const dataFilePath=path.join(__dirname,"data","restaurants.json");
    const fileData= fs.readFileSync(dataFilePath);
    const storedRestaurants=JSON.parse(fileData);

    res.render("restaurants",
        {
            numberOfRestaurants:storedRestaurants.length,
            restaurants:storedRestaurants
        }
    );
});

app.get("/confirm",(req,res)=>{
    res.render("confirm");
});

app.get("/about",(req,res)=>{
    res.render("about");
});

app.get("/recommend",(req,res)=>{
    res.render("recommend");
});

app.post("/recommend",(req,res)=>{
    const restaurant=req.body;
    const dataFilePath=path.join(__dirname,"data","restaurants.json");
    const fileData= fs.readFileSync(dataFilePath);
    const storedRestaurants=JSON.parse(fileData);
    storedRestaurants.push(restaurant);
    fs.writeFileSync(dataFilePath,JSON.stringify(storedRestaurants));
    res.redirect("/confirm");
});

app.listen(3000);