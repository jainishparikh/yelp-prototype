const orderSchema = require( '../../models/order' );



function handle_request ( msg, callback ) {
    let req = {
        params: msg
    }

    orderSchema.find( { userID: req.params.id } ).then( docs => {
        console.log( "Orders by users-------------------------------", docs )
        callback( null, docs )
    } ).catch( error => {
        console.log( "Error in Orders by Restaurant", error )
        callback( error, null )
    } )

}

exports.handle_request = handle_request;