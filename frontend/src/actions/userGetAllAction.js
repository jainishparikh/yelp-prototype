import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";



const USER_FETCH_ALL_SUCCESS = "user_fetch_all_success";
const USER_FETCH_ALL_FAILED = "user_fetch_all_failed";

var success = ( response, pageCount, restaurantID ) => {
    return {
        type: USER_FETCH_ALL_SUCCESS,
        payload: {
            response: response,
            pageCount: pageCount,
            restaurantID: restaurantID,
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: USER_FETCH_ALL_FAILED,
        payload: {
            response: err,
        }
    }
}


var userGetAllAction = ( perPage ) => ( dispatch ) => {
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    let restaurantID = cookie.load( 'id' )
    return axios.get( BACKEND_URL + '/users/all' ).then( ( response ) => {
        if ( response.status === 200 ) {

            let pageCount = Math.ceil( response.data.length / perPage )
            dispatch( success( response, pageCount, restaurantID ) )
        }

    } ).catch( ( err ) => {
        dispatch( error( err ) )
    } );

    ///

}

export default userGetAllAction