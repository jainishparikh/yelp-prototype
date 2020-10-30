const restaurantsSchema = require( '../../models/restaurants' );
var userSchema = require( '../../models/users' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }


    var messageData = {
        name: req.body.restaurantName,
        message: req.body.messageString
    }


    userSchema.findOne( { _id: req.body.userID, "messages.restaurantID": req.body.restaurantID } ).then( doc => {
        if ( doc ) {
            userSchema.findOneAndUpdate( { _id: req.body.userID, "messages.restaurantID": req.body.restaurantID }
                , { $push: { "messages.$.conversations": messageData } }, { new: true }
            ).then( doc => {
                console.log( "Reply Added", doc )
                callback( null, doc )
            } ).catch( error => {
                console.log( "error", error );
                callback( err, null )
            } )



        } else {

            var data = {
                userID: req.body.userID,
                restaurantID: req.body.restaurantID,
                restaurantName: req.body.restaurantName,
                userName: req.body.userName,
                conversations: [ messageData ]
            }
            console.log( "in else", data )
            userSchema.findByIdAndUpdate( { _id: req.body.userID },
                { $push: { messages: [ data ] } }, { new: true } ).then( doc => {
                    console.log( "Started Conversation", doc )
                    callback( null, doc )
                } ).catch( err => {
                    console.log( "error", err );
                    callback( err, null )

                } )


        }


    } ).catch( err => {
        console.log( "error", err );
        res.status( 400 ).send( "Error" );
    } )


}

exports.handle_request = handle_request;