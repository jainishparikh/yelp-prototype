import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";


const ORDER_FETCH_SUCCESS = "order_fetch_success";
const ORDER_FETCH_FAILED = "order_fetch_failed";

var success = ( response, perPage ) => {
    return {
        type: ORDER_FETCH_SUCCESS,
        payload: {
            response: response,
            perPage: perPage
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: ORDER_FETCH_FAILED,
        payload: {
            response: err,
        }
    }
}


var orderFetchAction = ( perPage ) => ( dispatch ) => {

    var userID = cookie.load( 'id' )
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    axios.get( BACKEND_URL + '/orders/users/' + userID ).then( response => {
        if ( response.status === 200 ) {

            //pageCount: Math.ceil( response.data.length / perPage )

            dispatch( success( response, perPage ) )
        }



    } ).catch( err => {
        dispatch( error( err ) )
    } )






}

export default orderFetchAction