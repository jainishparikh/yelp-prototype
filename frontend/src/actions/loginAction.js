import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";

const USER_LOGIN_SUCCESS = "user_login_success";
const USER_LOGIN_FAILED = "user_login_failed";
const RESTAURANT_LOGIN_SUCCESS = "restaurant_login_success";
const RESTAURANT_LOGIN_FAILED = "restaurant_login_failed";

var successUser = ( response, data ) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: {
            response: response,
            data: data
        }
    }
}

var errorUser = ( err, data ) => {
    return {
        type: USER_LOGIN_FAILED,
        payload: {
            response: err,
            data: data
        }
    }
}

var successRestaurant = ( response, data ) => {
    return {
        type: RESTAURANT_LOGIN_SUCCESS,
        payload: {
            response: response,
            data: data
        }
    }
}

var errorRestaurant = ( err, data ) => {
    return {
        type: RESTAURANT_LOGIN_FAILED,
        payload: {
            response: err,
            data: data
        }
    }
}


var loginAction = ( data ) => ( dispatch ) => {
    // console.log( "Inside user signup action", data )
    var backend_path = '';
    if ( data.type === 'users' ) {
        backend_path = '/users/login'
    } else if ( data.type === 'restaurants' ) {
        backend_path = '/restaurants/login'
    }
    console.log( data );
    console.log( BACKEND_URL + backend_path )
    axios
        .post( BACKEND_URL + backend_path, data )
        .then( ( response ) => {
            if ( response.status === 200 ) {
                let decoded = jwt_decode( response.data.split( ' ' )[ 1 ] )

                console.log( "decoded", decoded )
                cookie.save( "auth", true, {
                    path: '/',
                    httpOnly: false,
                    maxAge: 90000
                } )
                cookie.save( "token", response.data, {
                    path: '/',
                    httpOnly: false,
                    maxAge: 90000
                } )
                cookie.save( "id", decoded._id, {
                    path: '/',
                    httpOnly: false,
                    maxAge: 90000
                } )
                cookie.save( "name", decoded.name, {
                    path: '/',
                    httpOnly: false,
                    maxAge: 90000
                } )
                cookie.save( "email", decoded.email, {
                    path: '/',
                    httpOnly: false,
                    maxAge: 90000
                } )
                cookie.save( "type", decoded.type, {
                    path: '/',
                    httpOnly: false,
                    maxAge: 90000
                } )
                if ( data.type === 'users' ) {
                    dispatch( successUser( decoded, data ) )
                    // window.location.assign( '/users/dashboard' );
                } else if ( data.type === 'restaurants' ) {
                    dispatch( successRestaurant( decoded, data ) )
                    // window.location.assign( '/restaurants/about' );
                }
            }
        } )
        .catch( ( err ) => {
            if ( data.type === 'users' ) {
                dispatch( errorUser( err, data ) )
            } else if ( data.type === 'restaurants' ) {
                dispatch( errorRestaurant( err, data ) )
            }
        } );
}

export default loginAction