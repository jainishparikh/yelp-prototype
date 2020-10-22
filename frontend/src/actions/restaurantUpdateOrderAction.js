import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";
import profile_picture from '../images/profile.png';


const ORDERS_RESTAURANT_UPDATE_SUCCESS = "orders_restaurant_update_success";
const ORDERS_RESTAURANT_UPDATE_FAILED = "orders_restaurant_update_failed";

var success = ( response ) => {
    return {
        type: ORDERS_RESTAURANT_UPDATE_SUCCESS,
        payload: {
            response: response,

        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: ORDERS_RESTAURANT_UPDATE_FAILED,
        payload: {
            response: err,
        }
    }
}


var ordersAllAction = ( updatedStatus, orderID ) => ( dispatch ) => {
    if ( updatedStatus === "" ) {
        var data = {
            orderStatus: "Order Received"
        }
    } else {
        var data = {
            orderStatus: updatedStatus
        }
    }

    return axios.put( BACKEND_URL + '/orders/restaurants/update/' + orderID, data ).then( response => {
        console.log( "Updated" )
        dispatch( success( response ) )
        //this.props.reload( this.state.updatedStatus )
    } ).catch( err => {
        dispatch( error( err ) )
    } )




}

export default ordersAllAction