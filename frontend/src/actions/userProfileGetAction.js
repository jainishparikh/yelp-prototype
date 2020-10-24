import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";
import profile_picture from '../images/profile.png';


const USER_FETCH_SUCCESS = "user_fetch_success";
const USER_FETCH_FAILED = "user_fetch_failed";

var success = ( response, imagePath, following, restaurantID ) => {
    return {
        type: USER_FETCH_SUCCESS,
        payload: {
            response: response,
            imagePath: imagePath,
            following: following,
            restaurantID: restaurantID
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: USER_FETCH_FAILED,
        payload: {
            response: err,
        }
    }
}


var getUserProfileAction = ( email ) => ( dispatch ) => {

    let restaurantID = cookie.load( 'id' )
    //let email = this.props.match.params.userEmail
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    axios.get( BACKEND_URL + '/users/about/' + email ).then( ( response ) => {
        if ( response.status === 200 ) {
            console.log( "got data" )
            let imagePath = BACKEND_URL + "/images/profilepics/" + response.data.profilePicture
            if ( response.data.profilePicture === null ) {
                console.log( "inside imagepath null" )
                imagePath = profile_picture
            }
            let length = response.data.followedBy.length
            var following = false;
            for ( let i = 0; i < length; i++ ) {
                if ( response.data.followedBy[ i ] === restaurantID ) {
                    following = true
                    break;
                }
            }
            dispatch( success( response, imagePath, following, restaurantID ) )
        }
    } ).catch( err => {

        dispatch( error( err ) )
    } )
}



export default getUserProfileAction