let initialState = {
    restaurantData: {},
    profileImagePath: "",
    error: false,
    update: false,
    dishEdit: false,
    dishAdd: false,

}
var restaurantProfileReducer = ( state = initialState, action ) => {
    let newState = { ...state }

    switch ( action.type ) {
        case "restaurant_profile_success":
            newState.restaurantData = action.payload.response.data;
            newState.profileImagePath = action.payload.imagePath;
            return newState;

        case "restaurant_profile_failed":
            newState.error = true;
            newState.message = "Could Not get profile!"
            return newState;
        case "restaurant_profile_update_success":
            newState.update = true;
            newState.message = "restaurant Profile Update Successful";
            newState.restaurantData = action.payload.response.data;
            return newState;

        case "restaurant_profile_update_failed":
            newState.update = false;
            newState.message = "Update Failed";
            newState.restaurantData = action.payload.response.data;
            return newState;

        case "dish_add_success":
            newState.dishAdd = true;
            newState.message = "Dish Add Success";
            newState.restaurantData = action.payload.response.data;
            return newState;

        case "dish_add_failed":
            newState.dishAdd = false;
            newState.message = "Dish Add Failed";
            newState.restaurantData = action.payload.response.data;
            return newState;
        case "dish_edit_success":
            newState.dishEdit = true;
            newState.message = "Dish Edit Success";
            newState.restaurantData = action.payload.response.data;
            return newState;

        case "dish_edit_failed":
            newState.dishEdit = false;
            newState.message = "Dish Edit Failed";
            newState.restaurantData = action.payload.response.data;
            return newState;
        default:
            return newState;


    }
}

export default restaurantProfileReducer