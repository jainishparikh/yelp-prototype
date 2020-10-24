var express = require( 'express' );
var bcrypt = require( 'bcrypt' );
var router = express.Router();
var mongoose = require( '../config/db_config' );
var restaurantsSchema = require( '../models/restaurants' );
var userSchema = require( '../models/users' );
var nodeGeocoder = require( 'node-geocoder' );
var jwt = require( 'jsonwebtoken' );
var { secret } = require( '../config/config' )
var { auth, checkAuth } = require( '../config/passport' )
auth();

let options = {
    provider: 'openstreetmap'
};
let geoCoder = nodeGeocoder( options );

//signup
router.post( '/signup', ( req, res ) => {
    let location = req.body.address
    geoCoder.geocode( location )
        .then( ( result ) => {
            bcrypt.hash( req.body.password, 10, ( err, hash ) => {
                console.log( "result", result )
                let restaurant = new restaurantsSchema( {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    location: req.body.address,
                    latitude: result[ 0 ].latitude,
                    longitude: result[ 0 ].longitude,
                    restaurantType: "All",
                    profilePicture: "",



                } )

                restaurant.save().then( response => {
                    console.log( "Signup successfull" )
                    res.status( 200 ).send( response._id )
                } ).catch( error => {
                    console.log( "Error", error )
                    res.status( 400 ).send( error )
                } )
            } )
        } );
} );


//login
router.post( '/login', ( req, res ) => {

    restaurantsSchema.findOne( { email: req.body.email } ).then( doc => {

        if ( bcrypt.compareSync( req.body.password, doc.password ) ) {

            let payload = {
                _id: doc._id,
                type: "restaurants",
                email: doc.email,
                name: doc.name
            }
            let token = jwt.sign( payload, secret, {
                expiresIn: 1008000
            } )
            console.log( "Login Successfull" )
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

// get all restaurants
router.get( '/all', checkAuth, ( req, res ) => {
    console.log( "In restauranst all" )
    restaurantsSchema.find().then( docs => {

        console.log( "Restaurants", docs )
        res.status( 200 ).send( JSON.stringify( docs ) )


    } ).catch( error => {
        console.log( "Error fetching restaurant about", error )
        res.status( 400 ).send( "Error fetching user about" )
    } )

} );


//get restaurant about by email
router.get( '/about/:email', checkAuth, ( req, res ) => {

    restaurantsSchema.findOne( { email: req.params.email } ).then( doc => {

        // console.log( "Restaurant", doc )
        res.status( 200 ).send( JSON.stringify( doc ) )


    } ).catch( error => {
        console.log( "Error fetching restaurant about", error )
        res.status( 400 ).send( "Error fetching user about" )
    } )

} );


//get restaurant about by id
router.get( '/aboutbyID/:id', checkAuth, ( req, res ) => {
    restaurantsSchema.findOne( { _id: req.params.id } ).then( doc => {

        // console.log( "User", doc )
        res.status( 200 ).send( JSON.stringify( doc ) )

    } ).catch( error => {
        console.log( "Error fetching restaurant about", error )
        res.status( 400 ).send( "Error fetching restaurant about" )
    } )

} );


//update restaurant about
router.put( '/about', checkAuth, ( req, res ) => {
    let location = req.body.location
    geoCoder.geocode( location )
        .then( ( result ) => {

            restaurantsSchema.findOneAndUpdate( { email: req.body.email },
                {
                    $set: {
                        name: req.body.name,
                        email: req.body.email,
                        location: req.body.location,
                        contact: req.body.contact,
                        description: req.body.description,
                        timing: req.body.timing,
                        latitude: result[ 0 ].latitude,
                        longitude: result[ 0 ].longitude,
                        restaurantType: "All",

                    }
                }, { new: true }
            ).then( response => {
                console.log( "Update successfull" )
                res.status( 200 ).send( response )
            } ).catch( error => {
                console.log( "Error in update", error )
                res.status( 400 ).send( error )
            } )
        } ).catch( error => {
            res.status( 400 ).send( "Error finding location" + error )
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
            restaurantsSchema.findByIdAndUpdate( { _id: req.body.restaurantID },
                { $set: { profilePicture: req.file.filename } }, { new: true }
            ).then( response => {
                res.status( 200 ).send( "Image upload successfull" + response )
            } ).catch( error => {
                res.status( 400 ).send( "Image upload unsuccessfull" + error )
            } )

        }
    } );
} );



//get dishes by restaurants
router.get( '/dishes/:restaurantID', checkAuth, ( req, res ) => {

    restaurantsSchema.find().then( doc => {

        console.log( "Dish Images", doc )
        res.status( 200 ).send( JSON.stringify( doc ) )


    } ).catch( error => {
        console.log( "Error fetching dish images", error )
        res.status( 400 ).send( "Error fetching user about" )
    } )

} );


//add dishes
router.post( '/dishes', checkAuth, ( req, res ) => {
    let upload = req.app.get( 'upload_dishImage' );
    upload( req, res, err => {
        if ( err ) {
            console.log( "Error uploading Dish image", err );
            res.status( 400 ).end( 'Issue with Dish image uploading' )
        } else {
            var dish = {
                dishID: Date.now(),
                dishName: req.body.dishName,
                dishPrice: req.body.dishPrice,
                dishIngrediants: req.body.dishIngrediants,
                dishDescription: req.body.dishDescription,
                dishCategory: req.body.dishCategory,
                dishPicture: req.file.filename,
            }

            restaurantsSchema.findByIdAndUpdate( { _id: req.body.restaurantID }
                , { $push: { dishes: dish } }, { new: true }
            ).then( doc => {
                console.log( "Dish added", doc )
                res.status( 200 ).send( doc );
            } ).catch( error => {
                console.log( "error", error );
                res.status( 400 ).send( "Error adding dish" );
            } )


        }
    }
    )
} )




// update dish without image
router.put( '/dishes/withoutimage', ( req, res ) => {
    console.log( "body", req.body )
    var updatedDish = {
        dishID: req.body.dishID,
        dishName: req.body.dishName,
        dishIngrediants: req.body.dishIngrediants,
        dishPrice: req.body.dishPrice,
        dishDescription: req.body.dishDescription,
        dishCategory: req.body.dishCategory,
        dishPicture: req.body.dishPicture
    }
    restaurantsSchema.findOneAndUpdate(
        { _id: req.body.restaurantID, "dishes.dishID": req.body.dishID }
        , { $set: { "dishes.$": updatedDish } }, { new: true }


    ).then( doc => {
        res.status( 200 ).send( JSON.stringify( doc ) )

    } ).catch( error => {
        console.log( "Restuarant Not found", error );
        res.status( 400 ).send( "Error" )
    } )

} );

// update dish with image
router.put( '/dishes/withimage', ( req, res ) => {
    console.log( "body", req.body )
    let upload = req.app.get( 'upload_dishImage' );
    upload( req, res, err => {
        if ( err ) {
            console.log( "Error uploading Dish image", err );
            res.status( 400 ).end( 'Issue with Dish image uploading' )
        } else {

            var updatedDish = {
                dishID: req.body.dishID,
                dishName: req.body.dishName,
                dishIngrediants: req.body.dishIngrediants,
                dishPrice: req.body.dishPrice,
                dishDescription: req.body.dishDescription,
                dishCategory: req.body.dishCategory,
                dishPicture: req.file.filename
            }
            restaurantsSchema.findOneAndUpdate(
                { _id: req.body.restaurantID, "dishes.dishID": req.body.dishID }
                , { $set: { "dishes.$": updatedDish } }, { new: true }


            ).then( doc => {
                res.status( 200 ).send( JSON.stringify( doc ) )

            } ).catch( error => {
                console.log( "Restuarant Not found", error );
                res.status( 400 ).send( "Error" )
            } )
        }
    } )
} );


//reply to message
router.put( '/message', ( req, res ) => {

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
                res.status( 200 ).send( doc );
            } ).catch( error => {
                console.log( "error", error );
                res.status( 400 ).send( "Error in replying" );
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
                    res.status( 200 ).send( doc );
                } ).catch( err => {
                    console.log( "error", err );
                    res.status( 400 ).send( "Error Starting convo" );

                } )


        }


    } ).catch( err => {
        console.log( "error", err );
        res.status( 400 ).send( "Error" );
    } )

} )




module.exports = router;
