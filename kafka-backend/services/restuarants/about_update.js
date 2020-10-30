const restaurantsSchema = require( '../../models/restaurants' );



function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    restaurantsSchema.findOneAndUpdate( { email: req.body.email },
        {
            $set: {
                name: req.body.name,
                email: req.body.email,
                location: req.body.location,
                contact: req.body.contact,
                description: req.body.description,
                timing: req.body.timing,
                latitude: req.body.result[ 0 ].latitude,
                longitude: req.body.result[ 0 ].longitude,
                restaurantType: "All",

            }
        }, { new: true }
    ).then( response => {
        console.log( "Update successfull" )
        callback( null, response )
    } ).catch( error => {
        console.log( "Error in update", error )
        callback( error, null )
    } )



}

exports.handle_request = handle_request;