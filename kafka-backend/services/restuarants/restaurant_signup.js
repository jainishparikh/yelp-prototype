var bcrypt = require( 'bcrypt' );
const restaurantsSchema = require( '../../models/restaurants' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    bcrypt.hash( req.body.password, 10, ( err, hash ) => {
        console.log( "result", result )
        let restaurant = new restaurantsSchema( {
            name: req.body.name,
            email: req.body.email,
            password: hash,
            location: req.body.address,
            latitude: req.body.result[ 0 ].latitude,
            longitude: req.body.result[ 0 ].longitude,
            restaurantType: "All",
            profilePicture: "",



        } )

        restaurant.save().then( response => {
            console.log( "Signup successfull" )
            callback( null,
                response._id )
            //res.status( 200 ).send( response._id )
        } ).catch( error => {
            console.log( "Error", error )
            callback( error, null )
            // res.status( 400 ).send( error )
        } )
    } )






}

exports.handle_request = handle_request;