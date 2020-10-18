import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";
import profile_picture from '../images/profile.png';


const USER_PROFILE_SUCCESS = "user_profile_success";
const USER_PROFILE_FAILED = "user_profile_failed";

var success = ( response, imagePath ) => {
    return {
        type: USER_PROFILE_SUCCESS,
        payload: {
            response: response,
            imagePath: imagePath,
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: USER_PROFILE_FAILED,
        payload: {
            response: err,
        }
    }
}


var getUserProfileAction = () => ( dispatch ) => {
    let email = cookie.load( "email" )
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    return axios.get( BACKEND_URL + '/users/about/' + email ).then( ( response ) => {
        // console.log( response )
        if ( response.status === 200 ) {
            console.log( "got data", response.data._id )
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

export default getUserProfileAction