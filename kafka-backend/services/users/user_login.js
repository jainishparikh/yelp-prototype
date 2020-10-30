// var mongo = require( './mongo' );
var bcrypt = require( 'bcrypt' );
const userSchema = require( '../../models/users' );
var jwt = require( 'jsonwebtoken' );
var { secret } = require( '../../config/config' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    userSchema.findOne( { email: req.body.email } ).then( doc => {
        if ( bcrypt.compareSync( req.body.password, doc.password ) ) {
            let payload = {
                _id: doc._id,
                type: "users",
                email: doc.email,
                name: doc.name
            }

            let token = jwt.sign( payload, secret, {
                expiresIn: 1008000
            } )
            console.log( "Login Successfull", token )
            callback( null, "Bearer " + token )
            // res.status( 200 ).send( "Bearer " + token )
        } else {
            console.log( "Invalid Credentials" )
            // res.status( 401 ).send( "Invalid Credentials" )
            callback( "Invalid credentials", null )
        }

    } ).catch( error => {
        console.log( "User Not Found", error )
        res.status( 400 ).send( "User Not found" )
    } )


}

exports.handle_request = handle_request;