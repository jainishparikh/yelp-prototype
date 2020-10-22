import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";
import profile_picture from '../images/profile.png';


const REVIEWS_RESTAURANT_SUCCESS = "reviews_restaurant_success";
const REVIEWS_RESTAURANT_FAILED = "reviews_restaurant_failed";

var success = ( response ) => {
    return {
        type: REVIEWS_RESTAURANT_SUCCESS,
        payload: {
            response: response,
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: REVIEWS_RESTAURANT_FAILED,
        payload: {
            response: err,
        }
    }
}


var reviewsAllAction = () => ( dispatch ) => {
    var type = cookie.load( 'type' )
    var id = cookie.load( 'id' )
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    return axios.get( BACKEND_URL + '/reviews/getreviews/' + type + '/' + id ).then( response => {

        dispatch( success( response ) )

    } ).catch( err => {
        dispatch( error( err ) )
    } )



}

export default reviewsAllAction