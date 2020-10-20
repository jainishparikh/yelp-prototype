import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";
import profile_picture from '../images/restaurant.jpeg';


const RESTAURANT_PROFILE_SUCCESS = "restaurant_profile_success";
const RESTAURANT_PROFILE_FAILED = "restaurant_profile_failed";

var success = ( response, imagePath ) => {
    return {
        type: RESTAURANT_PROFILE_SUCCESS,
        payload: {
            response: response,
            imagePath: imagePath,
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: RESTAURANT_PROFILE_FAILED,
        payload: {
            response: err,
        }
    }
}


var restaurantGetProfileAction = () => ( dispatch ) => {
    let email = cookie.load( "email" )
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;

    return axios.get( BACKEND_URL + '/restaurants/about/' + email ).then( ( response ) => {
        if ( response.status === 200 ) {
            let imagePath = BACKEND_URL + "/images/profilepics/" + response.data.profilePicture
            if ( response.data.profilePicture === null || response.data.profilePicture === "" ) {
                console.log( "inside imagepath null" )
                imagePath = profile_picture
            }
            dispatch( success( response, imagePath ) )

        }

    } ).catch( ( err ) => {
        dispatch( error( err ) )

    } );





}

export default restaurantGetProfileAction