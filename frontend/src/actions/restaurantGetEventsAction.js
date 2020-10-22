import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";
import profile_picture from '../images/profile.png';


const EVENTS_RESTAURANT_SUCCESS = "events_restaurant_success";
const EVENTS_RESTAURANT_FAILED = "events_restaurant_failed";

var success = ( response, pageCount ) => {
    return {
        type: EVENTS_RESTAURANT_SUCCESS,
        payload: {
            response: response,
            pageCount: pageCount
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: EVENTS_RESTAURANT_FAILED,
        payload: {
            response: err,
        }
    }
}


var eventsAllAction = ( perPage ) => ( dispatch ) => {
    var restaurantID = cookie.load( 'id' )
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    return axios.get( BACKEND_URL + '/events/restaurants/' + restaurantID ).then( response => {

        let pageCount = Math.ceil( response.data.length / perPage )
        dispatch( success( response, pageCount ) )

    } ).catch( err => {
        dispatch( error( err ) )
    } )



}

export default eventsAllAction