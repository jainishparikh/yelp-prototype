let initialState = {
    Restaurants: [],
}
var restaurants = ( state = initialState, action ) => {
    let newState = { ...state }
    // console.log( state );
    switch ( action.type ) {
        case "restaurants_success":
            newState.Restaurants = action.payload.response.data
            newState.message = "Got Restaurants Success";
            return newState;
        case "restaurants_failed":
            newState.error = true;
            newState.message = "Failed getting restaurants"
            return newState;

        default:
            return newState;


    }
}

export default restaurants