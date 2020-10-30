var bcrypt = require( 'bcrypt' );
const userSchema = require( '../../models/users' );


function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }
    bcrypt.hash( req.body.password, 10, ( err, hash ) => {

        let user = new userSchema( {
            name: req.body.name,
            email: req.body.email,
            password: hash,
            nickName: "",
            contactNumber: "",
            dateOfBirth: "",
            city: "",
            state: "",
            country: "",
            headline: "",
            yelpingSince: "",
            thingsILove: "",
            blogLink: "",
            profilePicture: ""


        } )

        user.save().then( response => {
            console.log( "Signup successfull" )
            callback( null,
                response._id )
            // res.status( 200 ).send( response._id )
        } ).catch( error => {
            console.log( "Error", error )
            callback( error, null )
        } )


    } );


}

exports.handle_request = handle_request;