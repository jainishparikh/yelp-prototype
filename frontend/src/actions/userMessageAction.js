import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";
import profile_picture from '../images/profile.png';


const USER_MESSAGE_SUCCESS = "user_message_success";
const USER_MESSAGE_FAILED = "user_message_failed";

var success = ( response, imagePath ) => {
    return {
        type: USER_MESSAGE_SUCCESS,
        payload: {
            response: response,
            imagePath: imagePath
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: USER_MESSAGE_FAILED,
        payload: {
            response: err,
        }
    }
}


var userFollowAction = ( data ) => ( dispatch ) => {
    console.log( "data", data )
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    axios.put( BACKEND_URL + '/users/message', data ).then( response => {
        let imagePath = BACKEND_URL + "/images/profilepics/" + response.data.profilePicture
        if ( response.data.profilePicture === null || response.data.profilePicture === "" ) {
            console.log( "inside imagepath null" )
            imagePath = profile_picture
        }
        dispatch( success( response, imagePath ) )
    } ).catch( err => {
        dispatch( error( err ) )
    } )





}



export default userFollowAction