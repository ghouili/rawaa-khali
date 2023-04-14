const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email:{type:String, unique:true},
    name:{type: String, rquired: true},
    tel:{type: Number, rquired: true},
    password:{type: String, rquired: true},
});

module.exports = mongoose.model('user', UserSchema);