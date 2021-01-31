const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const Login = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}, { collection: 'auth', timestamps: true });

Login.methods.generateJWT = function () {
  return jwt.sign({
    // eslint-disable-next-line no-underscore-dangle
    id: this._id,
    email: this.email
  }, 'the_secret_key');
};

Login.methods.toAuthJSON = function () {
  return {
    email: this.email,
    token: this.generateJWT()
  };
};

Login.methods.validPassword = function (password) {
  return this.password === password;
};

module.exports = mongoose.model('Login', Login);
