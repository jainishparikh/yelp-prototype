import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";


const REGISTERED_EVENTS_SUCCESS = "registered_events_success";
const REGISTERED_EVENTS_FAILED = "registered_events_failed";

var success = ( response ) => {
    return {
        type: REGISTERED_EVENTS_SUCCESS,
        payload: {
            response: response,
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: REGISTERED_EVENTS_FAILED,
        payload: {
            response: err,
        }
    }
}


var eventsRegisteredAction = () => ( dispatch ) => {
    var id = cookie.load( 'id' )
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    axios.get( BACKEND_URL + '/events/users/' + id ).then( response => {
        console.log( "Got registered events" );
        dispatch( success( response ) )


    } ).catch( err => {
        dispatch( error( err ) )

    } )
}

export default eventsRegisteredAction