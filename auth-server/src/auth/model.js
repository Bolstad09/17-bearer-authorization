'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, unique: false},
});

userSchema.pre('save', function(next) {

  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(error => {throw error;});
});

userSchema.statics.authorize = function(token) {
  let parsedToken = jwt.verify(token, process.env.APP_SECRET || 'secret');
  let query = {_id:parsedToken.id};
  return this.findOne(query)
    .then(user => {
      return user;
    })
    .catch(error => error);
};

userSchema.statics.authenticate = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(error => error);
};

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};

userSchema.methods.generateToken = function() {
  return jwt.sign({id:this._id}, process.env.APP_SECRET || 'secret');
};

// export default mongoose.model('users', userSchema);
export default mongoose.model('user', userSchema);