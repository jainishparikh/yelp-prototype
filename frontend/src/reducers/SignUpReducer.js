let initialState = {
    auth: false
}
var user_signUp = ( state = initialState, action ) => {
    let newState = { ...state }
    // console.log( newState );
    switch ( action.type ) {
        case "user_signup_success":
            newState.auth = true;
            newState.error = false;
            newState.message = "User SignUp Success"
            return newState;
        case "user_signup_failed":
            newState.auth = false;
            newState.error = true;
            newState.message = "User already Exist!"
            return newState;
        case "restaurant_signup_success":
            newState.auth = true;
            newState.error = false;
            newState.message = "User SignUp Success"
            return newState;
        case "restaurant_signup_failed":
            newState.auth = false;
            newState.error = true;
            newState.message = "User already Exist!"
            return newState;
        default:
            return newState;


    }
}

export default user_signUp