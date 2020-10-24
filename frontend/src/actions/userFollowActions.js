import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";
import profile_picture from '../images/profile.png';


const USER_FOLLOW_SUCCESS = "user_follow_success";
const USER_FOLLOW_FAILED = "user_follow_failed";

var success = ( response, following ) => {
    return {
        type: USER_FOLLOW_SUCCESS,
        payload: {
            response: response,
            following: following
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: USER_FOLLOW_FAILED,
        payload: {
            response: err,
        }
    }
}


var userFollowAction = ( userID ) => ( dispatch ) => {
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    let data = {
        followerID: cookie.load( 'id' ),
        userID: userID
    }
    axios.post( BACKEND_URL + '/users/follow/', data ).then( response => {
        if ( response.status === 200 ) {
            dispatch( success( response, true ) )
        }
    } ).catch( err => {
        dispatch( error( err ) )
    } )


}



export default userFollowAction