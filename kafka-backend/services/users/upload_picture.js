const userSchema = require( '../../models/users' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    userSchema.findByIdAndUpdate( { _id: req.body.userID },
        { $set: { profilePicture: req.body.file.filename } }
    ).then( response => {
        console.log( "in upload success", resposnse )
        callback( null, response )
        //  res.status( 200 ).send( "Image upload successfull" + response )
    } ).catch( error => {
        callback( error, null )
        //res.status( 400 ).send( "Image upload unsuccessfull" + error )
    } )


}

exports.handle_request = handle_request;