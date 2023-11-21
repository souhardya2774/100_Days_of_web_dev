const express = require('express');
const bcrypt=require("bcryptjs");

const db = require('../data/database');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: '',
      confirmEmail: '',
      password: ''
    };
  }

  req.session.inputData = null;

  res.render('signup', { inputData: sessionInputData });
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/signup', async function (req, res) {
  const userData=req.body;
  const email=userData.email;
  const confirmedEmail=userData["confirm-email"];
  const password=userData.password;

  if(!email || !confirmedEmail || !password || (password.trim()).length<6 || email!=confirmedEmail || !email.includes("@")){
    req.session.inputData = {
      hasError: true,
      message: 'Invalid input - please check your data.',
      email: email,
      confirmEmail: confirmedEmail,
      password: password,
    };

    req.session.save(function () {
      res.redirect('/signup');
    });
    return;
  }

  const existingUser=await db.getDb().collection("users").findOne({email:email});

  if(existingUser){
    return res.redirect("/signup");
  }

  const hashedPassword=await bcrypt.hash(password,12);
  const data={
    email:email,
    password:hashedPassword
  };
  await db.getDb().collection("users").insertOne(data);
  res.redirect("/login");
});

router.post('/login', async function (req, res) {
  const userData=req.body;
  const email=userData.email;
  const password=userData.password;
  const existingUser=await db.getDb().collection("users").findOne({email:email});
  if(!existingUser){
    return res.redirect("/login");
  }
  const passwordsAreEqual=await bcrypt.compare(password,existingUser.password);
  if(!passwordsAreEqual){
    return res.redirect("/login");
  }
  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect('/admin');
  });
});

router.get('/admin', function (req, res) {
  if (!req.session.isAuthenticated) {
    // if (!req.session.user)
    return res.status(401).render('401');
  }
  res.render('admin');
});

router.get('/profile', function (req, res) {
  if (!req.session.isAuthenticated) {
    // if (!req.session.user)
    return res.status(401).render('401');
  }
  res.render('profile');
});

router.post('/logout', function (req, res) {
  req.session.user=null;
  req.session.isAuthenticated = false;
  res.redirect("/");
});

module.exports = router;
