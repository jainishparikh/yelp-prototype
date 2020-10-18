import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";


const RESTAURANTS_SUCCESS = "restaurants_success";
const RESTAURANTS_FAILED = "restaurants_failed";

var success = ( response ) => {
    return {
        type: RESTAURANTS_SUCCESS,
        payload: {
            response: response,
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: RESTAURANTS_FAILED,
        payload: {
            response: err,
        }
    }
}


var restaurantsAction = () => ( dispatch ) => {
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    axios.get( BACKEND_URL + '/restaurants/all' ).then( response => {
        dispatch( success( response ) )


    } ).catch( err => {
        dispatch( error( err ) )

    } )
}

export default restaurantsAction