const eventSchema = require( '../../models/events' );



function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    var eventDetails = new eventSchema( {
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        eventTime: req.body.eventTime,
        eventDate: req.body.eventDate,
        eventLocation: req.body.eventLocation,
        Hashtags: req.body.Hashtags,
        restaurantID: req.body.restaurantID,
        users: []
    } )

    eventDetails.save().then( response => {
        // console.log( "Event Posted", response )
        callback( null, response )

    } ).catch( error => {
        console.log( "Error", error )
        callback( error, null )

    } )




}

exports.handle_request = handle_request;