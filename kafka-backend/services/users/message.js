const userSchema = require( '../../models/users' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    var messageData = {
        name: req.body.userName,
        message: req.body.messageString
    }

    userSchema.findOneAndUpdate( { _id: req.body.userID, "messages.restaurantID": req.body.restaurantID }
        , { $push: { "messages.$.conversations": messageData } }, { new: true }
    ).then( doc => {
        console.log( "Reply Added", doc )
        callback( null, doc )
    } ).catch( error => {
        console.log( "error", error );
        callback( error, null )
    } )




}

exports.handle_request = handle_request;