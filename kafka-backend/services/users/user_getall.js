// var mongo = require( './mongo' );
var bcrypt = require( 'bcrypt' );
const userSchema = require( '../../models/users' );
var jwt = require( 'jsonwebtoken' );
var { secret } = require( '../../config/config' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    userSchema.find().then( docs => {

        console.log( "Users", docs )
        callback( null, docs )
        // res.status( 200 ).send( JSON.stringify( docs ) )


    } ).catch( error => {
        console.log( "Error fetching users", error )
        callback( error, null )

    } )


}

exports.handle_request = handle_request;