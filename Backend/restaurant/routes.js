var express = require( 'express' );
var bcrypt = require( 'bcrypt' );
var router = express.Router();
var mongoose = require( '../config/db_config' );
var restaurantsSchema = require( '../models/restaurants' );
var userSchema = require( '../models/users' );
var nodeGeocoder = require( 'node-geocoder' );
var kafka = require( '../kafka/client' );
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
            req.body.result = result
            kafka.make_request( 'restaurant_signup', req.body, function ( err, results ) {
                if ( err ) {
                    console.log( "Inside err", err );
                    res.status( 400 ).send( err )
                } else {
                    console.log( "Inside else", results );
                    res.status( 200 ).send( results )

                }

            } );
        } );
} );


//login
router.post( '/login', ( req, res ) => {
    kafka.make_request( 'restaurant_login', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );

} );

// get all restaurants
router.get( '/all', checkAuth, ( req, res ) => {
    console.log( "In restauranst all" )
    kafka.make_request( 'restaurant_getall', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( JSON.stringify( results ) )

        }

    } );

} );


//get restaurant about by email
router.get( '/about/:email', checkAuth, ( req, res ) => {
    kafka.make_request( 'restaurant_aboutbyEmail', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( JSON.stringify( results ) )

        }

    } );

} );


//get restaurant about by id
router.get( '/aboutbyID/:id', checkAuth, ( req, res ) => {

    kafka.make_request( 'restaurant_aboutbyID', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( JSON.stringify( results ) )

        }

    } );


} );


//update restaurant about
router.put( '/about', checkAuth, ( req, res ) => {
    let location = req.body.location
    geoCoder.geocode( location )
        .then( ( result ) => {
            req.body.result = result
            kafka.make_request( 'restaurant_about', req.body, function ( err, results ) {
                if ( err ) {
                    console.log( "Inside err", err );
                    res.status( 400 ).send( err )
                } else {
                    console.log( "Inside else", results );
                    res.status( 200 ).send( results )

                }

            } );
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
            req.body.file = req.file
            kafka.make_request( 'upload_picture', req.body, function ( err, results ) {
                if ( err ) {
                    console.log( "Inside err" );
                    res.status( 400 ).send( "Error Fetching users", err )
                } else {
                    console.log( "Inside else", results );
                    res.status( 200 ).send( results )

                }

            } );

        }
    } );
} );



//get dishes by restaurants
router.get( '/dishes/:restaurantID', checkAuth, ( req, res ) => {

    kafka.make_request( 'dishes_getall', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err" );
            res.status( 400 ).send( "Error Fetching users", err )
        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );

} );


//add dishes
router.post( '/dishes', checkAuth, ( req, res ) => {
    let upload = req.app.get( 'upload_dishImage' );
    upload( req, res, err => {
        if ( err ) {
            console.log( "Error uploading Dish image", err );
            res.status( 400 ).end( 'Issue with Dish image uploading' )
        } else {
            req.body.file = req.file;
            kafka.make_request( 'dishes_add', req.body, function ( err, results ) {
                if ( err ) {
                    console.log( "Inside err" );
                    res.status( 400 ).send( "Error Fetching users", err )
                } else {
                    console.log( "Inside else", results );
                    res.status( 200 ).send( results )

                }

            } );
        }
    }
    )
} )




// update dish without image
router.put( '/dishes/withoutimage', ( req, res ) => {
    console.log( "body", req.body )
    kafka.make_request( 'dishes_update_woImage', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err" );
            res.status( 400 ).send( "Error Fetching users", err )
        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( JSON.stringify( results ) )

        }

    } );

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
            req.body.file = req.file;
            kafka.make_request( 'dishes_update_wImage', req.body, function ( err, results ) {
                if ( err ) {
                    console.log( "Inside err" );
                    res.status( 400 ).send( "Error Fetching users", err )
                } else {
                    console.log( "Inside else", results );
                    res.status( 200 ).send( JSON.stringify( results ) )

                }

            } );
        }
    } )
} );


//reply to message
router.put( '/message', ( req, res ) => {
    kafka.make_request( 'restaurant_message', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err" );
            res.status( 400 ).send( "Error Fetching users", err )
        } else {
            console.log( "Inside else", results );
            res.status( 200 ).send( results )

        }

    } );
    // var messageData = {
    //     name: req.body.restaurantName,
    //     message: req.body.messageString
    // }


    // userSchema.findOne( { _id: req.body.userID, "messages.restaurantID": req.body.restaurantID } ).then( doc => {
    //     if ( doc ) {
    //         userSchema.findOneAndUpdate( { _id: req.body.userID, "messages.restaurantID": req.body.restaurantID }
    //             , { $push: { "messages.$.conversations": messageData } }, { new: true }
    //         ).then( doc => {
    //             console.log( "Reply Added", doc )
    //             res.status( 200 ).send( doc );
    //         } ).catch( error => {
    //             console.log( "error", error );
    //             res.status( 400 ).send( "Error in replying" );
    //         } )



    //     } else {

    //         var data = {
    //             userID: req.body.userID,
    //             restaurantID: req.body.restaurantID,
    //             restaurantName: req.body.restaurantName,
    //             userName: req.body.userName,
    //             conversations: [ messageData ]
    //         }
    //         console.log( "in else", data )
    //         userSchema.findByIdAndUpdate( { _id: req.body.userID },
    //             { $push: { messages: [ data ] } }, { new: true } ).then( doc => {
    //                 console.log( "Started Conversation", doc )
    //                 res.status( 200 ).send( doc );
    //             } ).catch( err => {
    //                 console.log( "error", err );
    //                 res.status( 400 ).send( "Error Starting convo" );

    //             } )


    //     }


    // } ).catch( err => {
    //     console.log( "error", err );
    //     res.status( 400 ).send( "Error" );
    // } )

} )




module.exports = router;
