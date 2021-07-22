const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:
    {
        type:'String',
        required:true,
        trim:true
    },
    lastName:
    {
        type:'String',
        required:true,
        trim:true
    },
    userName:
    {
        type:'String',
        required:false
    },
    email:
    {
        type:'String',
        required:true,
        unique: true,
        trim:true,
        lowercase: true
    },
    password:
    {
        type:'String',
        required:true,
        minlength: 8
    }
});

module.exports = User = mongoose.model("user", userSchema);