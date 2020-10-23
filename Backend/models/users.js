const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;

var individialMessageSchema = new Schema( {
    name: String,
    message: String
} )


var messageSchema = new Schema( {
    userID: String,
    restaurantID: String,
    restaurantName: String,
    userName: String,
    conversations: [ individialMessageSchema ]
} )


var userSchema = new Schema( {
    name: String,
    email: { type: String, unique: true },
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
    profilePicture: String,
    followedBy: [ String ],
    messages: [ messageSchema ],

}
    , { collection: 'users' }
);

module.exports = mongoose.model( 'userSchema', userSchema );  