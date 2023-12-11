const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
        lastName: String,
        firstName: String,
        dateOfBirth: Number,
        address1: String,
        address2: String,
        city: String,
        postalCode: Number,
        country: String,
        phoneNumber: Number,
        email: String,
        userNotes: String
    })
const UserSchema = mongoose.model('user', userSchema)
module.exports = UserSchema