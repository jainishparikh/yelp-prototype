var reviewSchema = require( '../../models/review' )


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    var review = new reviewSchema( {
        userID: req.body.userID,
        restaurantID: req.body.restaurantID,
        headline: req.body.headline,
        reviewText: req.body.reviewText,
        date: req.body.date,
        ratings: req.body.ratings,
        restaurantName: req.body.restaurantName,
        reviewerName: req.body.reviewerName,
    } )

    review.save().then( response => {
        // console.log( "review added", response )
        callback( null, response )

    } ).catch( error => {
        console.log( "errr adding review", error )
        callback( error, null )
    } )

}

exports.handle_request = handle_request;