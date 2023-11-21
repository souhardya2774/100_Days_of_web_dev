const express = require('express');
const mongodb=require("mongodb");

const db=require("../data/database");
const ObjectId=mongodb.ObjectId;

const router = express.Router();

router.get('/',async function(req, res) {
  res.redirect('/posts');
});

router.get('/posts',async function(req, res) {
  const posts=await db.getDB().collection("posts").find({}).project({ title: 1, summary: 1, 'author.name': 1 }).toArray();
  res.render('posts-list',{posts:posts});
});

router.get('/new-post', async function(req, res) {
  const documents=await db.getDB().collection("authors").find().toArray();
  res.render('create-post',{authors:documents});
});

router.get("/post/:id",async (req,res)=>{
  const postId=req.params.id;
  if(!ObjectId.isValid(postId)){
    return res.status(404).render("404");
  }
  const posts=await db.getDB().collection("posts").find({_id:new ObjectId(postId)}).project({_id:0,title:1,body:1,date:1,author:1}).toArray();
  if(!posts || posts.length==0){
    return res.status(404).render("404");
  }
  const post=posts[0];
  if(!post){
    return res.status(404).render("404");
  }
  const postData={
    ...post
  };
  postData.date=post.date.toISOString();
  postData.humanReadableDate=post.date.toLocaleDateString("en-US",{
      weekday: "long",
      year:"numeric",
      month:"long",
      day:"numeric"
  });
  const authorData=await db.getDB().collection("authors").findOne({_id:postData.author._id});
  postData.author.email=authorData.email;
  res.render("post-detail",{post:postData});
});

router.get("/post/:id/edit",async (req,res)=>{
  const reqId=req.params.id;
  if(!ObjectId.isValid(reqId)){
    return res.status(404).render("404");
  }
  const posts=await db.getDB().collection("posts").find({_id:new ObjectId(reqId)}).project({summary:1,title:1,body:1}).toArray();
  if(!posts || posts.length==0){
    return res.status(404).render("404");
  }
  res.render("update-post",{post:posts[0]});
});

router.post("/posts",async (req,res)=>{
  if(!ObjectId.isValid(req.body.author)){
    return res.redirect("/new-post");
  }
  const authorId=new ObjectId(req.body.author);
  const author=await db.getDB().collection("authors").findOne({_id:authorId});
  if(!author || author.length==0){
    return res.redirect("/new-post");
  }
  const newPost={
    title:req.body.title,
    summary:req.body.summary,
    body:req.body.content,
    date:new Date(),
    author:{
      _id: authorId,
      name:author.name
    }
  };
  const result=await db.getDB().collection("posts").insertOne(newPost);
  res.redirect("/posts");
});

router.post("/post/:id/delete",async (req,res)=>{
  const reqId=req.params.id;
  if(!ObjectId.isValid(reqId)){
    return res.status(404).render("404");
  }
  const result=await db.getDB().collection("posts").deleteOne({_id:new ObjectId(reqId)});
  res.redirect("/posts");
});

router.post("/post/:id/edit",async (req,res)=>{
  const reqId=req.params.id;
  if(!ObjectId.isValid(reqId)){
    res.redirect("/posts");
  }
  const result=await db.getDB().collection("posts").updateOne({_id:new ObjectId(reqId)},{$set:req.body});
  res.redirect(`/posts`);
});

module.exports = router;