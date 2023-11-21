// const { json } = require("body-parser");
const express=require("express");
const path = require("path");


const defaultRoutes=require("./routes/default");
const restaurantRoutes=require("./routes/restaurants");

const app=express();

const filePath=path.join(__dirname,"views");

app.set("views",filePath);
app.set("view engine","ejs");

app.use(express.static("frontend-site"));
app.use(express.urlencoded({extended:false}));

app.use("/",defaultRoutes);

app.use("/",restaurantRoutes);

app.use((req,res)=>{
    res.status(404).render("404");
});

app.use((error,req,res,next)=>{
    res.status(500).render("500");
});

app.listen(3000);