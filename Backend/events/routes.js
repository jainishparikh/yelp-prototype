var express = require( 'express' );
const { route } = require( '../reviews/routes' );
var router = express.Router();
var mongoose = require( '../config/db_config' );
var eventSchema = require( '../models/events' );
var { secret } = require( '../config/config' )
var kafka = require( '../kafka/client' );
var { auth, checkAuth } = require( '../config/passport' )
auth();


//get all events
router.get( '/', checkAuth, ( req, res ) => {
    kafka.make_request( 'events_getall', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            // console.log( "Inside else", results );
            res.status( 200 ).send( JSON.stringify( results ) )

        }

    } );
    // eventSchema.find( {} ).then( doc => {
    //     console.log( "All Events", doc )
    //     res.status( 200 ).send( JSON.stringify( doc ) )
    // } ).catch( error => {
    //     console.log( "Error fetching events" )
    //     res.status( 400 ).send( error )
    // } )
} )

//get users by events
router.get( '/attendees/:id', checkAuth, ( req, res ) => {

    kafka.make_request( 'events_users', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            // console.log( "Inside else", results );
            res.status( 200 ).send( JSON.stringify( results ) )

        }

    } );

    // eventSchema.findById( { _id: req.params.id } ).then( doc => {
    //     console.log( "Users by Events", doc.users )
    //     res.status( 200 ).send( JSON.stringify( doc.users ) )
    // } ).catch( error => {
    //     console.log( "Error fetching events" )
    //     res.status( 400 ).send( error )
    // } )
} )


//get events by restaurants
router.get( '/restaurants/:id', checkAuth, ( req, res ) => {
    console.log( "Rest ID", req.params.id )
    kafka.make_request( 'events_restaurants', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            // console.log( "Inside else", results );
            res.status( 200 ).send( JSON.stringify( results ) )

        }

    } );


    // eventSchema.find( { restaurantID: req.params.id } ).then( docs => {
    //     console.log( "Events by restaurants", docs )
    //     res.status( 200 ).send( JSON.stringify( docs ) )
    // } ).catch( error => {
    //     console.log( "Error fetching events" )
    //     res.status( 400 ).send( error )
    // } )
} )


//post events by restaurants
router.post( '/restaurants/addEvent', checkAuth, ( req, res ) => {
    kafka.make_request( 'events_post', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            // console.log( "Inside else", results );
            res.status( 200 ).send( JSON.stringify( results ) )

        }

    } );
    // var eventDetails = new eventSchema( {
    //     eventName: req.body.eventName,
    //     eventDescription: req.body.eventDescription,
    //     eventTime: req.body.eventTime,
    //     eventDate: req.body.eventDate,
    //     eventLocation: req.body.eventLocation,
    //     Hashtags: req.body.Hashtags,
    //     restaurantID: req.body.restaurantID,
    //     users: []
    // } )

    // eventDetails.save().then( response => {
    //     console.log( "Event Posted", response )
    //     res.status( 200 ).send( response )
    // } ).catch( error => {
    //     console.log( "Error", error )
    //     res.status( 400 ).send( error )
    // } )


} );


//register for an event for user
router.post( '/users/register', checkAuth, ( req, res ) => {
    kafka.make_request( 'events_register', req.body, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            // console.log( "Inside else", results );
            res.status( 200 ).send( JSON.stringify( results ) )

        }

    } );
    // var user = {
    //     userID: req.body.userID,
    //     userName: req.body.userName,
    //     userEmail: req.body.userEmail,

    // }


    // eventSchema.findByIdAndUpdate( { _id: req.body.eventID }
    //     , { $push: { users: user } }, { new: true }
    // ).then( doc => {
    //     console.log( "User registered", doc )
    //     res.status( 200 ).send( doc );
    // } ).catch( error => {
    //     console.log( "error", error );
    //     res.status( 400 ).send( "Error adding dish" );
    // } )

} )



// get all registered events for a user
router.get( '/users/:id', checkAuth, ( req, res ) => {
    kafka.make_request( 'events_registered', req.params, function ( err, results ) {
        if ( err ) {
            console.log( "Inside err", err );
            res.status( 400 ).send( err )
        } else {
            // console.log( "Inside else", results );
            res.status( 200 ).send( JSON.stringify( results ) )

        }

    } );
    // eventSchema.find( { "users.userID": req.params.id } ).then( docs => {
    //     console.log( "Registered Events", docs )
    //     res.status( 200 ).send( JSON.stringify( docs ) )
    // } ).catch( error => {
    //     console.log( "Error", error );
    //     res.status( 400 ).send( error )
    // } )

} )





module.exports = router;