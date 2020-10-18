import axios from 'axios';
import BACKEND_URL from '../config/config'

const USER_SIGNUP_SUCCESS = "user_signup_success";
const USER_SIGNUP_FAILED = "user_signup_failed";
const RESTAURANT_SIGNUP_SUCCESS = "restaurant_signup_success";
const RESTAURANT_SIGNUP_FAILED = "restauarnt_signup_failed";

var successUser = ( response, data ) => {
    return {
        type: USER_SIGNUP_SUCCESS,
        payload: {
            response: response,
            data: data
        }
    }
}

var errorUser = ( err, data ) => {
    return {
        type: USER_SIGNUP_FAILED,
        payload: {
            response: err,
            data: data
        }
    }
}

var successRestaurant = ( response, data ) => {
    return {
        type: RESTAURANT_SIGNUP_SUCCESS,
        payload: {
            response: response,
            data: data
        }
    }
}

var errorRestaurant = ( err, data ) => {
    return {
        type: RESTAURANT_SIGNUP_FAILED,
        payload: {
            response: err,
            data: data
        }
    }
}




var userSignUpAction = ( data ) => ( dispatch ) => {

    if ( data.type === 'users' ) {
        axios
            .post( BACKEND_URL + '/users/signup', data )
            .then( ( response ) => {
                if ( response.status === 200 ) {
                    dispatch( successUser( response, data ) )
                    // window.location.assign( '/login' )
                }

            } )
            .catch( ( err ) => {
                dispatch( errorUser( err, data ) )

            } );
    } else if ( data.type === 'restaurants' ) {
        axios
            .post( BACKEND_URL + '/restaurants/signup', data )
            .then( ( response ) => {
                console.log( response )
                if ( response.status === 200 ) {
                    dispatch( successRestaurant( response, data ) )
                    // window.location.assign( '/login' )
                }

            } ).catch( ( err ) => {
                dispatch( errorRestaurant( err, data ) )
            } );
    }

}

export default userSignUpAction