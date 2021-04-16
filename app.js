const express = require('express');
const session = require('express-session');
const passport = require('passport');
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;
require('dotenv').config();
const CALLBACK_URL = "/appid/callback";

console.log(process.env);


const app = express();
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
  tenantId: "1c02a05d-5037-47f8-9c13-edcb5e7ebe2d",
  clientId: "460d69ad-292c-4454-a65c-9a0575a23696",
  secret: "YzBiMjI2ODctYjE0NC00MDI5LThmNzEtYWU0YWIzMmM2YjEw",
  oauthServerUrl: "https://au-syd.appid.cloud.ibm.com/oauth/v4/1c02a05d-5037-47f8-9c13-edcb5e7ebe2d",
  redirectUri: "https://cloudfarm.us-south.cf.appdomain.cloud/appid/callback"
  // redirectUri: "http://localhost:8080/appid/callback"
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