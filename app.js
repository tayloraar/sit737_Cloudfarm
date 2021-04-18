const express = require('express');
const session = require('express-session');
const passport = require('passport');
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;
const MongoClient = require('mongodb').MongoClient
const Require = require('dotenv').config();
const CALLBACK_URL = "/appid/callback";
const app = express();
//console.log(process.env.MAPSAPI);

//DataBase Management
const uri = `mongodb+srv://${process.env.MDBCFUN}:${process.env.MDBCFPW}@cf-cluster1.hngdb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Setting collection variables
var collectionFarms;
var collectionMessages;
var collectionPlants;


// Connecting collection variables to database collections
client.connect(err => {
  collectionMessages = client.db("CloudFarm").collection("messages");
  collectionFarms = client.db("CloudFarm").collection("farms");
  collectionPlants = client.db("CloudFarm").collection("plants"); 
    collection = client.db("CloudFarm").listCollections().toArray(function(err,items){
    console.log(items)
  })

});



app.use(session({
   secret: "123456",
   resave: true,
   saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, cb)=> cb(null,user));
passport.deserializeUser((user, cb)=> cb(null, user));


passport.use(new WebAppStrategy({
  tenantId: process.env.TENANTID,
  clientId: process.env.CLIENTID,
  secret: process.env.APPIDSECRET,
  oauthServerUrl: process.env.OAUTHSERVERURL,
  // redirectUri: "https://cloudfarm.us-south.cf.appdomain.cloud/appid/callback"
  redirectUri: process.env.CALLBACKURLAPID
}));

// app.get('/appid/callback', passport.authenticate(WebAppStrategy.STRATEGY_NAME));

app.get('/appid/callback', function(req,res){
res.redirect('/dashboard.html');
});

app.get('/mapSet', function(req,res){
  //data.redirect('/dashboard.html')
  mapsAPI = process.env.MAPSAPI;
  res.send(mapsAPI);
})

app.get('/appid/login', passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
 successRedirect: "/"
}))

app.get('/appid/login', passport.authenticate(WebAppStrategy.STRATEGY_NAME))

app.get('/appid/logout', function(req,res){
  WebAppStrategy.logout(req);
  res.redirect('/');
})

//app.use(passport.authenticate(WebAppStrategy.STRATEGY_NAME));

app.use(express.static('./public'));

var port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Example app isn't listening at http://localhost:${port}`)
})



 //this is only needed for Cloud foundry 
 require("cf-deployment-tracker-client").track();

