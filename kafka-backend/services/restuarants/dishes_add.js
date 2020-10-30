const restaurantsSchema = require( '../../models/restaurants' );



function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }


    var dish = {
        dishID: Date.now(),
        dishName: req.body.dishName,
        dishPrice: req.body.dishPrice,
        dishIngrediants: req.body.dishIngrediants,
        dishDescription: req.body.dishDescription,
        dishCategory: req.body.dishCategory,
        dishPicture: req.body.file.filename,
    }

    restaurantsSchema.findByIdAndUpdate( { _id: req.body.restaurantID }
        , { $push: { dishes: dish } }, { new: true }
    ).then( doc => {
        console.log( "Dish added", doc )
        callback( null, doc )
    } ).catch( error => {
        console.log( "error", error );
        callback( error, null )
    } )

}

exports.handle_request = handle_request;