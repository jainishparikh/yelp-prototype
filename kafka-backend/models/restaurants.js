const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;

var dishesSchema = new Schema( {
    dishID: String,
    dishName: String,
    dishIngrediants: String,
    dishPrice: String,
    dishDescription: String,
    dishCategory: String,
    dishPicture: String,
} )


var restaurantsSchema = new Schema( {
    name: String,
    email: { type: String, unique: true },
    password: String,
    location: String,
    description: String,
    contact: Number,
    timing: String,
    restaurantType: String,
    latitude: Number,
    longitude: Number,
    profilePicture: String,
    dishes: [ dishesSchema ],
    following: [ String ]

}
    , { collection: 'restaurants' }
);

module.exports = mongoose.model( 'restaurantsSchema', restaurantsSchema );  