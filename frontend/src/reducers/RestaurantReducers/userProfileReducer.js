let initialState = {
    userData: {},
    following: false,
}
var userProfile = ( state = initialState, action ) => {
    let newState = { ...state }
    // console.log( state );
    switch ( action.type ) {
        case "user_fetch_success":
            newState.userData = action.payload.response.data
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

        default:
            return newState;


    }
}

export default userProfile