const orderSchema = require( '../../models/order' );



function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }


    orderSchema.findOneAndUpdate( { _id: req.body.params.id }, { $set: { orderStatus: req.body.orderStatus } }, { new: true } ).then( response => {
        console.log( "Update success", response )
        callback( null, response )
    } ).catch( error => {
        console.log( "Error updating orderstatus", error )
        callback( error, null )
    } )


}

exports.handle_request = handle_request;