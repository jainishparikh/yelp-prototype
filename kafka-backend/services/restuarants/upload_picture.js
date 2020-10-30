const restaurantsSchema = require( '../../models/restaurants' );



function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    restaurantsSchema.findByIdAndUpdate( { _id: req.body.restaurantID },
        { $set: { profilePicture: req.body.file.filename } }, { new: true }
    ).then( response => {
        callback( null, response )
    } ).catch( error => {
        callback( error, null )
    } )


}

exports.handle_request = handle_request;