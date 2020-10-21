import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";
import profile_picture from '../images/restaurant.jpeg';


const RESTAURANT_PROFILE_UPDATE_SUCCESS = "restaurant_profile_update_success";
const RESTAURANT_PROFILE_UPDATE_FAILED = "restaurant_profile_update_failed";

var success = ( response ) => {
    return {
        type: RESTAURANT_PROFILE_UPDATE_SUCCESS,
        payload: {
            response: response,

        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: RESTAURANT_PROFILE_UPDATE_FAILED,
        payload: {
            response: err,
        }
    }
}


var restaurantUpdateProfileAction = ( data ) => ( dispatch ) => {
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    return axios
        .put( BACKEND_URL + "/restaurants/about", data ).then( response => {
            if ( response.status === 200 ) {

                if ( cookie.load( 'email' ) !== data.email ) {
                    cookie.remove( "email", {
                        path: '/'
                    } );
                    cookie.save( "email", data.email, {
                        path: '/',
                        httpOnly: false,
                        maxAge: 90000
                    } )
                }
                if ( cookie.load( 'name' ) !== data.name ) {
                    cookie.remove( "name", {
                        path: '/'
                    } );
                    cookie.save( "name", data.name, {
                        path: '/',
                        httpOnly: false,
                        maxAge: 90000
                    } )
                }
                dispatch( success( response ) )
            }

        } ).catch( err => {
            dispatch( error( err ) )
        } )


}

export default restaurantUpdateProfileAction