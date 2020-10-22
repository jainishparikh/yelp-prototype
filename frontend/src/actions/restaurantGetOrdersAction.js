import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";
import profile_picture from '../images/profile.png';


const ORDERS_RESTAURANT_SUCCESS = "orders_restaurant_success";
const ORDERS_RESTAURANT_FAILED = "orders_restaurant_failed";

var success = ( response, pageCount ) => {
    return {
        type: ORDERS_RESTAURANT_SUCCESS,
        payload: {
            response: response,
            pageCount: pageCount
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: ORDERS_RESTAURANT_FAILED,
        payload: {
            response: err,
        }
    }
}


var ordersAllAction = ( perPage ) => ( dispatch ) => {
    console.log( "in order action" )
    var restaurantID = cookie.load( 'id' );
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    axios.get( BACKEND_URL + '/orders/restaurants/' + restaurantID ).then( response => {


        let pageCount = Math.ceil( response.data.length / perPage )
        dispatch( success( response, pageCount ) )
        // console.log( this.state )
    } ).catch( err => {
        dispatch( error( err ) )
    } )





}

export default ordersAllAction