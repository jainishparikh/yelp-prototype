const eventSchema = require( '../../models/events' );



function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    eventSchema.findById( { _id: req.params.id } ).then( doc => {

        callback( null, doc )
        //  res.status( 200 ).send( JSON.stringify( doc.users ) )
    } ).catch( error => {
        console.log( "Error fetching events" )
        callback( error, null )

    } )


}

exports.handle_request = handle_request;