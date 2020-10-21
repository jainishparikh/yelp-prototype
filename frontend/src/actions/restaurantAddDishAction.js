import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";


const DISH_ADD_SUCCESS = "dish_add_success";
const DISH_ADD_FAILED = "dish_add_failed";

var success = ( response ) => {
    return {
        type: DISH_ADD_SUCCESS,
        payload: {
            response: response,
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: DISH_ADD_FAILED,
        payload: {
            response: err,
        }
    }
}


var restaurantAddDishAction = ( data ) => ( dispatch ) => {

    var dishData = {
        restaurantID: cookie.load( 'id' ),
        dishName: data.dishName,
        dishIngrediants: data.dishIngrediants,
        dishPrice: data.dishPrice,
        dishDescription: data.dishDescription,
        dishCategory: data.dishCategory

    }
    const formData = new FormData();
    formData.append( 'myImage', data.newDishImage, data.newDishImage.name )
    for ( var key in dishData ) {
        formData.append( key, dishData[ key ] );
    }
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    return axios
        .post( BACKEND_URL + "/restaurants/dishes", formData, config ).then( response => {
            if ( response.status === 200 ) {
                console.log( "dish successfully added" + response );

                dispatch( success( response ) )
            }
        } ).catch( err => {
            dispatch( error( err ) )
        } )






}

export default restaurantAddDishAction