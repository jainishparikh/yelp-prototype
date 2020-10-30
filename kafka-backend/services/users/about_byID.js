const userSchema = require( '../../models/users' );


function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }


    userSchema.findOne( { _id: req.params.id } ).then( doc => {

        console.log( "User", doc )
        callback( null, doc )
        // res.status( 200 ).send( JSON.stringify( doc ) )

    } ).catch( error => {
        console.log( "Error fetching user about", error )
        callback( error, null )
        // res.status( 400 ).send( "Error fetching user about" )
    } )




}

exports.handle_request = handle_request;