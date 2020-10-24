import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";
import profile_picture from '../images/profile.png';


const RESTAURANT_MESSAGE_SUCCESS = "restaurant_message_success";
const RESTAURANT_MESSAGE_FAILED = "restaurant_message_failed";

var success = ( response, restaurantID ) => {
    return {
        type: RESTAURANT_MESSAGE_SUCCESS,
        payload: {
            response: response,
            restaurantID: restaurantID
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: RESTAURANT_MESSAGE_FAILED,
        payload: {
            response: err,
        }
    }
}


var restaurantMessageAction = ( data ) => ( dispatch ) => {
    console.log( "data", data )
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    axios.put( BACKEND_URL + '/restaurants/message', data ).then( response => {
        dispatch( success( response, data.restaurantID ) )
    } ).catch( err => {
        dispatch( error( err ) )
    } )





}



export default restaurantMessageAction