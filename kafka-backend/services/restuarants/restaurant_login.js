// var mongo = require( './mongo' );
var bcrypt = require( 'bcrypt' );
const restaurantsSchema = require( '../../models/restaurants' );
var jwt = require( 'jsonwebtoken' );
var { secret } = require( '../../config/config' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    restaurantsSchema.findOne( { email: req.body.email } ).then( doc => {

        if ( bcrypt.compareSync( req.body.password, doc.password ) ) {

            let payload = {
                _id: doc._id,
                type: "restaurants",
                email: doc.email,
                name: doc.name
            }
            let token = jwt.sign( payload, secret, {
                expiresIn: 1008000
            } )
            console.log( "Login Successfull" )
            callback( null, "Bearer " + token )
        } else {
            console.log( "Invalid Credentials" )
            callback( "Invalid credentials", null )
        }

    } ).catch( error => {
        console.log( "User Not Found", error )
        callback( "Invalid credentials", null )

    } )


}

exports.handle_request = handle_request;