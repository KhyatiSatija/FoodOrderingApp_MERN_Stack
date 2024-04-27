// here we are defining the user schema using mongoose model -> which is a wrappper for our schema
const mongoose = require('mongoose')
const { Schema } = mongoose;
// destructuring in javascript

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },

  });

  module.exports = mongoose.model('user',UserSchema)
//user ke naam ka collection bn jayega mongoDB atlas mai
