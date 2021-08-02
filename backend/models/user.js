const mongoose = require('mongoose');
const validator = require('validator');



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter your name'],
        maxLength:[30,'Your name cannot exceed 30ch']
    },
    email:{
        type:String,
        required:[true, 'please enter the email'],
        unique:true,
        validate:[validator.isEmail,'please enter the valid email']

    },
    password:{
        type:String,
        required:[true, 'please enter your password'],
        minLength:[6, 'your password must be longer than 6ch'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true

        }
    },
    role:{
        type:String,
        default: 'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordTokken: String,
    resetPasswordExpire:Date

})


module.exports = mongoose.model ('User', userschema);
