const path = require('path');

const express = require('express');
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session")(session);

const db = require('./data/database');
const demoRoutes = require('./routes/demo');

const app = express();

const sessionStore=new mongodbStore({
  uri:"mongodb://localhost:27017",
  databaseName:"auth-demo",
  collection:"sessions"
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: "souhardya-dutta-loves-anime",
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie:{
    maxAge: 31 * 24 * 60 * 60 * 1000
  }
}));

app.use(demoRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(3000);
});
