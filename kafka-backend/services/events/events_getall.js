const eventSchema = require( '../../models/events' );



function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }


    eventSchema.find( {} ).then( doc => {

        callback( null, doc )

    } ).catch( error => {
        console.log( "Error fetching events" )
        callback( error, null )

    } )


}

exports.handle_request = handle_request;