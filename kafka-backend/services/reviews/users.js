var reviewSchema = require( '../../models/review' )


function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }


    reviewSchema.find( { userID: req.params.id } ).then( doc => {

        callback( null, doc )

    } ).catch( error => {
        console.log( "Not found", error )
        callback( error, null )

    } )


}

exports.handle_request = handle_request;