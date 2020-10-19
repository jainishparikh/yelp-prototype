import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";


const ORDER_CANCEL_SUCCESS = "order_cancel_success";
const ORDER_CANCEL_FAILED = "order_cancel_failed";

var success = ( response, orderID ) => {
    return {
        type: ORDER_CANCEL_SUCCESS,
        payload: {
            response: response,
            orderID: orderID,
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: ORDER_CANCEL_FAILED,
        payload: {
            response: err,
        }
    }
}


var orderCancelAction = ( orderID, data ) => ( dispatch ) => {
    console.log( "data", data )
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    return axios.put( BACKEND_URL + '/orders/users/cancel/' + orderID, data ).then( response => {
        console.log( "Updated and Cancelled" )
        dispatch( success( response, orderID ) )
        // window.location.reload();

    } ).catch( err => {
        dispatch( error( err ) )
    } )




}

export default orderCancelAction