const userSchema = require( '../../models/users' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    userSchema.findByIdAndUpdate( { _id: req.body.userID }
        , { $push: { followedBy: req.body.followerID } }, { new: true }
    ).then( doc => {
        console.log( "User Added", doc )
        callback( null, doc )
        // res.status( 200 ).send( doc );
    } ).catch( error => {
        console.log( "error", error );
        callback( error, null )
        // res.status( 400 ).send( "Error following" );
    } )



}

exports.handle_request = handle_request;