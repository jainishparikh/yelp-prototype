let initialState = {
    Restaurants: [],
}
var restaurants = ( state = initialState, action ) => {
    // console.log( state );
    switch ( action.type ) {
        case "restaurants_success":
            state.Restaurants = action.payload.response.data
            state.message = "Got Restaurants Success";
            return state;
        case "restaurants_failed":
            state.error = true;
            state.message = "Failed getting restaurants"
            return state;

        default:
            return state;


    }
}

export default restaurants