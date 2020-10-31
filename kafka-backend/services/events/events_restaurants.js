const eventSchema = require( '../../models/events' );



function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    eventSchema.find( { restaurantID: req.params.id } ).then( docs => {

        callback( null, docs )


    } ).catch( error => {
        console.log( "Error fetching events" )
        callback( error, null )

    } )

}

exports.handle_request = handle_request;