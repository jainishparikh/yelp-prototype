var express = require( 'express' );
var router = express.Router();
var mongoose = require( '../config/db_config' );
var reviewSchema = require( '../models/review' )
var { secret } = require( '../config/config' )
var { auth, checkAuth } = require( '../config/passport' )
var kafka = require( '../kafka/client' );

auth();


//ad reviews
router.post( '/addreview', checkAuth, ( req, res ) => {
    kafka.make_request( 'review_add', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            // console.log( "Inside else", results );
            res.status( 200 ).send( JSON.stringify( results ) )

        }

    } );
    // var review = new reviewSchema( {
    //     userID: req.body.userID,
    //     restaurantID: req.body.restaurantID,
    //     headline: req.body.headline,
    //     reviewText: req.body.reviewText,
    //     date: req.body.date,
    //     ratings: req.body.ratings,
    //     restaurantName: req.body.restaurantName,
    //     reviewerName: req.body.reviewerName,
    // } )

    // review.save().then( response => {
    //     console.log( "review added", response )
    //     res.status( 200 ).send( response )
    // } ).catch( error => {
    //     console.log( "errr adding review", error )
    //     res.status( 400 ).send( error )
    // } )
} )

//get reviews by users
router.get( '/getreviews/users/:id', checkAuth, ( req, res ) => {

    kafka.make_request( 'review_users', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            // console.log( "Inside else", results );
            res.status( 200 ).send( JSON.stringify( results ) )

        }

    } );
    // console.log( "id", req.params.id )
    // reviewSchema.find( { userID: req.params.id } ).then( doc => {
    //     console.log( "Review users", doc )
    //     res.status( 200 ).send( JSON.stringify( doc ) )
    // } ).catch( error => {
    //     console.log( "Not found", error )
    //     res.status( 400 ).send( error )
    // } )
} )


//get reviews by restaurants
router.get( '/getreviews/restaurants/:id', checkAuth, ( req, res ) => {
    kafka.make_request( 'review_restaurants', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            // console.log( "Inside else", results );
            res.status( 200 ).send( JSON.stringify( results ) )

        }

    } );
    // reviewSchema.find( { restaurantID: req.params.id } ).then( doc => {
    //     console.log( "Review restauranst", doc )
    //     res.status( 200 ).send( JSON.stringify( doc ) )
    // } ).catch( error => {
    //     console.log( "Not found", error )
    //     res.status( 400 ).send( error )
    // } )
} )

module.exports = router;