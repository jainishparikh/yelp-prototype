// var mongo = require( './mongo' );
var bcrypt = require( 'bcrypt' );
const restaurantsSchema = require( '../../models/restaurants' );

var jwt = require( 'jsonwebtoken' );
var { secret } = require( '../../config/config' );


function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }
    restaurantsSchema.find().then( doc => {

        console.log( "Restaurant", doc )
        callback( null, doc )


    } ).catch( error => {
        console.log( "Error fetching restaurant about", error )
        callback( error, null )

    } )



}

exports.handle_request = handle_request;