import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";


const ORDER_SUCCESS = "order_success";
const ORDER_FAILED = "order_failed";

var success = ( response ) => {
    return {
        type: ORDER_SUCCESS,
        payload: {
            response: response,
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: ORDER_FAILED,
        payload: {
            response: err,
        }
    }
}


var orderNowAction = ( data ) => ( dispatch ) => {

    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    return axios.post( BACKEND_URL + '/orders/users/placeOrder', data ).then( response => {
        console.log( "Added order successfully", response.data );
        dispatch( success( response ) )


    } ).catch( err => {
        dispatch( error( err ) )
    } )



}

export default orderNowAction