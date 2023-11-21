const express=require("express");
const db=require("../data/database");

const router=express.Router();

router.get("/",(req,res)=>{
    res.redirect("/posts");
});

router.get("/posts",async (req,res)=>{
    const [posts]=await db.query("SELECT posts.id,posts.title,posts.summary,authors.name FROM posts INNER JOIN authors ON (posts.author_id = authors.id);");
    res.render("posts-list",{
        posts:posts
    });
});

router.get("/new-post",async (req,res)=>{
    const [authors]=await db.query("SELECT * FROM authors;");
    res.render("create-post",{authors:authors});
});

router.get("/post/:id",async (req,res)=>{
    const postId=req.params.id;
    const [posts]=await db.query("SELECT a.title,a.summary,a.body,a.date,authors.name,authors.email FROM (SELECT * FROM posts WHERE id=?) AS a INNER JOIN authors ON (a.author_id = authors.id);",postId);
    if(!posts || posts.length===0){
        return res.status(404).render("404");
    }

    const postData={
        ...posts[0]
    };

    postData.date=posts[0].date.toISOString();
    postData.humanReadableDate=posts[0].date.toLocaleDateString("en-US",{
        weekday: "long",
        year:"numeric",
        month:"long",
        day:"numeric"
    });
    res.render("post-detail",{post:postData});
});

router.get("/post/:id/edit",async (req,res)=>{
    const postId=req.params.id;
    const [posts]=await db.query("SELECT * FROM posts WHERE id=?",postId);

    if(!posts && posts.length===0){
        return res.status(404).render("404");
    }

    res.render("update-post",{
        post:posts[0]
    });
});

router.post("/posts",async (req,res)=>{
    const data=[
        req.body.title,
        req.body.summary,
        req.body.content,
        req.body.author
    ];
    await db.query("INSERT INTO posts (title,summary,body,author_id) VALUES (?)",[data]);
    res.redirect("/posts");
});

router.post("/post/:id/edit",async (req,res)=>{
    const query=`
        UPDATE posts SET title=?,summary=?,body=?
        WHERE id=?
    `;

    await db.query(query,[req.body.title,req.body.summary,req.body.content,req.params.id]);

    res.redirect("/posts");
});

router.post("/post/:id/delete",async (req,res)=>{
    const query=`DELETE FROM posts WHERE id=?;`;
    await db.query(query,req.params.id);
    res.redirect("/posts");
});

module.exports=router;