const eventSchema = require( '../../models/events' );



function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    var user = {
        userID: req.body.userID,
        userName: req.body.userName,
        userEmail: req.body.userEmail,

    }


    eventSchema.findByIdAndUpdate( { _id: req.body.eventID }
        , { $push: { users: user } }, { new: true }
    ).then( doc => {
        callback( null, doc )

    } ).catch( error => {
        console.log( "error", error );
        callback( error, null )

    } )


}

exports.handle_request = handle_request;