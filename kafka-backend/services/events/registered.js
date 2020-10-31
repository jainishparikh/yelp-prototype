const eventSchema = require( '../../models/events' );



function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    eventSchema.find( { "users.userID": req.params.id } ).then( docs => {

        callback( null, docs )

    } ).catch( error => {
        console.log( "Error", error );
        callback( error, null )

    } )


}

exports.handle_request = handle_request;