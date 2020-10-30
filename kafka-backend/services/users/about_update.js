const userSchema = require( '../../models/users' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    userSchema.findOneAndUpdate( { email: req.body.email },
        {
            $set: {
                name: req.body.name,
                email: req.body.email,
                nickName: req.body.nickName,
                contactNumber: req.body.contactNumber,
                dateOfBirth: req.body.dateOfBirth,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                headline: req.body.headline,
                yelpingSince: req.body.yelpingSince,
                thingsILove: req.body.thingsILove,
                blogLink: req.body.blogLink
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