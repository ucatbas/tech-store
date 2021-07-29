const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); //yeni

const userSchema = new mongoose.Schema({
    Name: {type: String, required: true},
    Surname: {type: String, required: true},
    TaxId: {type: String, required: true},
    HomeAddress: {type: String, required: true},
    Email: {type: String, required: true},
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    //confPassword: {type: String, required: true}

});

// Hashing password before saving it to the database
userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.Password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.Password = hash;
      next();
    })
  });

/*
module.exports.findUserById = function(email,callback){  //Vedat 
    var query = {Email:email};
    Users.find(query).select('-_id').limit(1);
}*/

module.exports = mongoose.model('User', userSchema);

