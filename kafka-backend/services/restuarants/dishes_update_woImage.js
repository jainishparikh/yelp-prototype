const restaurantsSchema = require( '../../models/restaurants' );



function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    var updatedDish = {
        dishID: req.body.dishID,
        dishName: req.body.dishName,
        dishIngrediants: req.body.dishIngrediants,
        dishPrice: req.body.dishPrice,
        dishDescription: req.body.dishDescription,
        dishCategory: req.body.dishCategory,
        dishPicture: req.body.dishPicture
    }
    restaurantsSchema.findOneAndUpdate(
        { _id: req.body.restaurantID, "dishes.dishID": req.body.dishID }
        , { $set: { "dishes.$": updatedDish } }, { new: true }


    ).then( doc => {
        callback( null, doc )

    } ).catch( error => {
        console.log( "Restuarant Not found", error );
        callback( error, null )
    } )

}

exports.handle_request = handle_request;