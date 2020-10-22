let initialState = {
    Users: [],
    following: [],

}
var reviewsReducer = ( state = initialState, action ) => {
    let newState = { ...state }
    switch ( action.type ) {
        case "user_fetch_all_success":
            newState.Users = action.payload.response.data
            let length = action.payload.response.data.length
            for ( let i = 0; i < length; i++ ) {
                let l = action.payload.response.data[ i ].followedBy.length
                for ( let j = 0; j < l; j++ ) {
                    if ( action.payload.response.data[ i ].followedBy[ j ] === action.payload.restaurantID ) {
                        newState.following.push( action.payload.response.data[ i ]._id )
                    }
                }

            }
            newState.message = "Fetch Review Success";
            return newState;
        case "user_fetch_all_failed":
            newState.error = true;
            newState.message = "Fetch Review Failed"
            return newState;


        default:
            return newState;


    }
}

export default reviewsReducer