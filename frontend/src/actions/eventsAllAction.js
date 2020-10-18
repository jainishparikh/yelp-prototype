import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";
import profile_picture from '../images/profile.png';


const EVENTS_SUCCESS = "events_success";
const EVENTS_FAILED = "events_failed";

var success = ( response ) => {
    return {
        type: EVENTS_SUCCESS,
        payload: {
            response: response,
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: EVENTS_FAILED,
        payload: {
            response: err,
        }
    }
}


var eventsAllAction = () => ( dispatch ) => {
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    axios.get( BACKEND_URL + '/events/' ).then( response => {
        console.log( "got events", response.data )
        dispatch( success( response ) )
    } ).catch( err => {
        dispatch( error( err ) )
    } )
}

export default eventsAllAction