var express = require( 'express' );
var bcrypt = require( 'bcrypt' );
var router = express.Router();
var mongoose = require( '../config/db_config' );
var userSchema = require( '../models/users' );
var jwt = require( 'jsonwebtoken' );
var { secret } = require( '../config/config' )
var { auth, checkAuth } = require( '../config/passport' )
auth();

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
            let payload = {
                _id: doc._id,
                type: "users",
                email: doc.email,
                name: doc.name
            }

            let token = jwt.sign( payload, secret, {
                expiresIn: 1008000
            } )
            console.log( "Login Successfull", token )
            res.status( 200 ).send( "Bearer " + token )
        } else {
            console.log( "Invalid Credentials" )
            res.status( 401 ).send( "Invalid Credentials" )
        }

    } ).catch( error => {
        console.log( "User Not Found", error )
        res.status( 400 ).send( "User Not found" )
    } )

} );

// get all users
router.get( '/all', checkAuth, ( req, res ) => {
    userSchema.find().then( docs => {

        console.log( "Users", docs )
        res.status( 200 ).send( JSON.stringify( docs ) )


    } ).catch( error => {
        console.log( "Error fetching users", error )
        res.status( 400 ).send( "Error fetching users" )
    } )

} );

//get user about by email
router.get( '/about/:email', checkAuth, ( req, res ) => {

    userSchema.findOne( { email: req.params.email } ).then( doc => {

        console.log( "User", doc )
        res.status( 200 ).send( JSON.stringify( doc ) )


    } ).catch( error => {
        console.log( "Error fetching user about", error )
        res.status( 400 ).send( "Error fetching user about" )
    } )

} );


//get user about by id
router.get( '/aboutbyID/:id', checkAuth, ( req, res ) => {
    userSchema.findOne( { _id: req.params.id } ).then( doc => {

        console.log( "User", doc )
        res.status( 200 ).send( JSON.stringify( doc ) )

    } ).catch( error => {
        console.log( "Error fetching user about", error )
        res.status( 400 ).send( "Error fetching user about" )
    } )

} );



//update user about
router.put( '/about', checkAuth, ( req, res ) => {

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
        res.status( 200 ).send( response )
    } ).catch( error => {
        console.log( "Error in update", error )
        res.status( 400 ).send( error )
    } )


} );


//upload profile pic
router.post( '/uploadpicture', checkAuth, ( req, res ) => {
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

//follow user
router.post( '/follow', checkAuth, ( req, res ) => {

    console.log( "follow", req.body )
    userSchema.findByIdAndUpdate( { _id: req.body.userID }
        , { $push: { followedBy: req.body.followerID } }, { new: true }
    ).then( doc => {
        console.log( "User Added", doc )
        res.status( 200 ).send( doc );
    } ).catch( error => {
        console.log( "error", error );
        res.status( 400 ).send( "Error following" );
    } )


} )


//reply to message
router.put( '/message', checkAuth, ( req, res ) => {

    var messageData = {
        name: req.body.userName,
        message: req.body.messageString
    }

    userSchema.findOneAndUpdate( { _id: req.body.userID, "messages.restaurantID": req.body.restaurantID }
        , { $push: { "messages.$.conversations": messageData } }, { new: true }
    ).then( doc => {
        console.log( "Reply Added", doc )
        res.status( 200 ).send( doc );
    } ).catch( error => {
        console.log( "error", error );
        res.status( 400 ).send( "Error in replying" );
    } )


} )

module.exports = router;