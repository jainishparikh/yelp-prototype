const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;

var userSchema = new Schema( {
    name: String,
    email: String,
    password: String,
    nickName: String,
    contactNumber: Number,
    dateOfBirth: Date,
    city: String,
    state: String,
    country: String,
    headline: String,
    yelpingSince: String,
    thingsILove: String,
    blogLink: String,
    profilePicture: String

}
    , { collection: 'users' }
);

module.exports = mongoose.model( 'userSchema', userSchema );  