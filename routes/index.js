var express = require('express');
const path = require('path');
//var mongoose = require('mongoose');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require("../models/user");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index.hbs', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/products.hbs', function(req, res, next) {
  res.render('products', { title: 'Express' });
});

router.get('/products1.hbs', function(req, res, next) {
  res.render('products1', { title: 'Express' });
});

router.get('/products2.hbs', function(req, res, next) {
  res.render('products2', { title: 'Express' });
});

router.get('/mail.hbs', function(req, res, next) {
  res.render('mail', { title: 'Express' });
});

router.get('/about.hbs', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.post("/signIn", function(req, res){ //form'daki action'a göre route ediyor
    console.log('signIn gırdı');
    //console.log(req.body.Email);

    User.findOne({Email:req.body.Email},function(err,result){ //vedo
      
      if(err){ //database de olmayan kullanıcı girildiğinde error var
        //throw (err);
         //error handling
      }
      //console.log(bcrypt.hash(result.Password, 10));

      if(req.body.Email===result.Email && bcrypt.compareSync(req.body.Password, result.Password)){ //passwordun hashine bakması lazım
        console.log("Welcome ",result.Email);
      }
      else{
        console.log("hata");
      }


     // console.log(result['TaxId']); // spesifik attribute erişim
     //console.log(result); //vedo
   });
   res.redirect("/")
  });

 router.post("/register", function(req, res){ //form'daki action'a göre route ediyor
 
 if (req.body.Password !== req.body.confPassword) {
  var err = new Error('Password doesn\'t match!');
  err.status = 400;
  res.send('Password doesn\'t match!');
  return err;
}

User.findOne({ Email: req.body.Email }, function(err, user) { 
  //console.log(user)
  if(err) {
    console.log("error handle")
     //handle error here
  }
  //if a user was found, that means the user's email matches the entered email
  if (user) {
      res.status(400).json({ //HTML
      message : "A user with that email has already registered. Please use a different email.."
      });
  } else {
       //code if no user with entered email was found
       const user = new User(req.body); 
       user.save() 
       res.redirect("/")
  }
}); 
    
  });


module.exports = router;
