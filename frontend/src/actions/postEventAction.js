import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";
import profile_picture from '../images/profile.png';


const POST_EVENTS_SUCCESS = "post_events_success";
const POST_EVENTS_FAILED = "post_events_failed";

var success = ( response ) => {
    return {
        type: POST_EVENTS_SUCCESS,
        payload: {
            response: response,
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: POST_EVENTS_FAILED,
        payload: {
            response: err,
        }
    }
}


var postEventsAction = ( data ) => ( dispatch ) => {
    var eventData = {
        eventName: data.eventName,
        eventTime: data.eventTime,
        eventDate: data.eventDate,
        eventDescription: data.eventDescription,
        eventLocation: data.eventLocation,
        Hashtags: data.hashtags,
        restaurantID: cookie.load( 'id' ),
    }
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    return axios.post( BACKEND_URL + "/events/restaurants/addEvent", eventData ).then( response => {
        if ( response.status === 200 ) {
            console.log( "Event successfully Posted" + response );

            dispatch( success( response ) )
        }
    } ).catch( err => {
        dispatch( error( err ) )
    } )





}

export default postEventsAction