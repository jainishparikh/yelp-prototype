const restaurantsSchema = require( '../../models/restaurants' );



function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    restaurantsSchema.find().then( doc => {

        console.log( "Dish Images", doc )
        callback( null, doc )


    } ).catch( error => {
        console.log( "Error fetching dish images", error )
        callback( error, null )
    } )


}

exports.handle_request = handle_request;