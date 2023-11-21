const express = require('express');
const multer=require("multer");

const storageConfig=multer.diskStorage({
  destination:(req,file,callBack)=>{
    callBack(null, "images");
  },
  filename:(req,file,callBack)=>{
    callBack(null,Date.now()+"-"+file.originalname);
  }
});

const upload = multer({storage:storageConfig});
const router = express.Router();

const db=require("../data/database");

router.get('/',async function(req, res) {
  const users=await db.getDb().collection("users").find().toArray();
  res.render('profiles',{users:users});
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

router.post("/profiles",upload.single("image") ,async (req,res)=>{
  const uploadedImageFile= req.file;
  const userData= req.body;

  await db.getDb().collection("users").insertOne({
    name:userData.username,
    imagePath:uploadedImageFile.path
  });

  res.redirect("/");
});

module.exports = router;