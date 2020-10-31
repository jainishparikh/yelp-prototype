const restaurantsSchema = require( '../../models/restaurants' );
const orderSchema = require( '../../models/order' );



function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    orderSchema.findOneAndUpdate( { _id: req.body.params.id },
        { $set: { orderStatus: req.body.orderStatus, cancelled: "Yes" } }, { new: true }
    ).then( response => {
        console.log( "Update/Cancel success", response )
        callback( null, response )
    } ).catch( error => {
        console.log( "Error updating orderstatus", error )
        callback( error, null )
    } )


}

exports.handle_request = handle_request;