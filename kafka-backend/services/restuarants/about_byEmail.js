const restaurantsSchema = require( '../../models/restaurants' );



function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }
    restaurantsSchema.findOne( { email: req.params.email } ).then( doc => {

        // console.log( "Restaurant", doc )
        callback( null, doc )

    } ).catch( error => {
        console.log( "Error fetching restaurant about", error )
        callback( error, null )
    } )


}

exports.handle_request = handle_request;