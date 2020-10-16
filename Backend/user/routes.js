var express = require( 'express' );
var bcrypt = require( 'bcrypt' );
var router = express.Router();
var mongoose = require( '../config/db_config' );
var userSchema = require( '../models/users' );

//signup
router.post( '/signup', ( req, res ) => {

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
            res.status( 200 ).send( response._id )
        } ).catch( error => {
            console.log( "Error", error )
            res.status( 400 ).send( error )
        } )


    } );


} )

//login
router.post( '/login', ( req, res ) => {

    userSchema.findOne( { email: req.body.email } ).then( doc => {

        if ( bcrypt.compareSync( req.body.password, doc.password ) ) {
            console.log( "Login Successfull" )
            res.status( 200 ).send( doc )
        } else {
            console.log( "Invalid Credentials" )
            res.status( 401 ).send( "Invalid Credentials" )
        }

    } ).catch( error => {
        console.log( "User Not Found", error )
        res.status( 400 ).send( "User Not found" )
    } )

} );

//get user about by email
router.get( '/about/:email', ( req, res ) => {

    userSchema.findOne( { email: req.params.email } ).then( doc => {

        console.log( "User", doc )
        res.status( 200 ).send( JSON.stringify( doc ) )


    } ).catch( error => {
        console.log( "Error fetching user about", error )
        res.status( 400 ).send( "Error fetching user about" )
    } )

} );


//get user about by id
router.get( '/aboutbyID/:id', ( req, res ) => {
    userSchema.findOne( { _id: req.params.id } ).then( doc => {

        console.log( "User", doc )
        res.status( 200 ).send( JSON.stringify( doc ) )

    } ).catch( error => {
        console.log( "Error fetching user about", error )
        res.status( 400 ).send( "Error fetching user about" )
    } )

} );



//update user about
router.put( '/about', ( req, res ) => {

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
        }
    ).then( response => {
        console.log( "Update successfull" )
        res.status( 200 ).send( response )
    } ).catch( error => {
        console.log( "Error in update", error )
        res.status( 400 ).send( error )
    } )


} );


//upload profile pic
router.post( '/uploadpicture', ( req, res ) => {
    let upload = req.app.get( 'upload_profileImage' );
    upload( req, res, err => {
        if ( err ) {
            console.log( "Error uploading image", err );
            res.status( 400 ).end( 'Issue with uploading' )
        } else {
            console.log( "Inside upload", req.file, req.body );
            userSchema.findByIdAndUpdate( { _id: req.body.userID },
                { $set: { profilePicture: req.file.filename } }
            ).then( response => {
                res.status( 200 ).send( "Image upload successfull" + response )
            } ).catch( error => {
                res.status( 400 ).send( "Image upload unsuccessfull" + error )
            } )

        }
    } );
} );

module.exports = router;