let initialState = {
    Reviews: [],

}
var reviewsReducer = ( state = initialState, action ) => {
    let newState = { ...state }
    switch ( action.type ) {
        case "reviews_restaurant_success":
            newState.Reviews = action.payload.response.data
            newState.message = "Fetch Review Success";
            return newState;
        case "reviews_restaurant_success":
            newState.error = true;
            newState.message = "Fetch Review Failed"
            return newState;


        default:
            return newState;


    }
}

export default reviewsReducer