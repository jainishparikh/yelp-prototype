import axios from 'axios';
import BACKEND_URL from '../config/config'
import cookie from "react-cookies";


const DISH_EDIT_SUCCESS = "dish_edit_success";
const DISH_EDIT_FAILED = "dish_edit_failed";

var success = ( response ) => {
    return {
        type: DISH_EDIT_SUCCESS,
        payload: {
            response: response,
        }
    }
}

var error = ( err ) => {
    console.log( "err", err )
    return {
        type: DISH_EDIT_FAILED,
        payload: {
            response: err,
        }
    }
}


var restaurantEditDishAction = ( data, oldPicture ) => ( dispatch ) => {
    var dishData = {
        restaurantID: cookie.load( 'id' ),
        dishID: data.dishID,
        dishName: data.dishName,
        dishIngrediants: data.dishIngrediants,
        dishPrice: data.dishPrice,
        dishDescription: data.dishDescription,
        dishCategory: data.dishCategory

    }
    console.log( "dishID", data, oldPicture )
    var api_path = "";
    if ( data.newDishImage === "" ) {
        console.log( "without new image" )
        dishData.dishPicture = oldPicture
        var formData = dishData;
        var config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        api_path = "/restaurants/dishes/withoutimage"
    } else {
        api_path = "/restaurants/dishes/withimage"
        var formData = new FormData();
        formData.append( 'myImage', data.newDishImage, data.newDishImage.name )

        for ( var key in dishData ) {
            formData.append( key, dishData[ key ] );
        }

        var config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
    }
    console.log( formData );
    axios.defaults.headers.common[ "authorization" ] = cookie.load( 'token' )
    axios.defaults.withCredentials = true;
    return axios
        .put( BACKEND_URL + api_path, formData, config ).then( response => {
            if ( response.status === 200 ) {
                console.log( "dish successfully added" + response );

                dispatch( success( response ) )
            }
        } ).catch( err => {
            dispatch( error( err ) );
        } )




}

export default restaurantEditDishAction