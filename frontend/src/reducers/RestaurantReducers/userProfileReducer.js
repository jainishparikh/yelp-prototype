let initialState = {
    userData: {},
    messages: {},
    following: false,
}
var userProfile = ( state = initialState, action ) => {
    let newState = { ...state }
    // console.log( state );
    switch ( action.type ) {
        case "user_fetch_success":
            newState.userData = action.payload.response.data;
            let length = action.payload.response.data.messages.length
            let flag = false;
            for ( let i = 0; i < length; i++ ) {
                if ( action.payload.response.data.messages[ i ].restaurantID === action.payload.restaurantID ) {
                    newState.messages = action.payload.response.data.messages[ i ]
                    flag = true
                    break;
                }
            }
            if ( flag === false ) {
                newState.messages = {}
            }
            newState.following = action.payload.following
            newState.profileImagePath = action.payload.imagePath;
            newState.message = "Got User Data";
            return newState;
        case "user_fetch_failed":
            newState.error = true;
            newState.message = "Failed getting user"
            return newState;

        case "user_follow_success":
            newState.userData = action.payload.response.data
            newState.following = action.payload.following
            newState.message = "Started following user"
            return newState;
        case "user_fetch_failed":
            newState.error = true;
            newState.message = "Failed following user"
            return newState;

        case "restaurant_message_success":
            newState.userData = action.payload.response.data;
            let length1 = action.payload.response.data.messages.length;
            for ( let i = 0; i < length1; i++ ) {
                console.log( "object", action.payload.response.data.messages[ i ].restaurantID, action.payload.restaurantID )
                if ( action.payload.response.data.messages[ i ].restaurantID === action.payload.restaurantID ) {
                    newState.messages = action.payload.response.data.messages[ i ]
                    break;
                }
            }
            newState.message = "Messaged"
            return newState;
        case "restaurant_message_failed":
            newState.error = true;
            newState.message = "Failed messeging user"
            return newState;

        default:
            return newState;


    }
}

export default userProfile