let initialState = {
    Events: [],
    pageCount: 5,
    postEvent: false

}
var eventsReducer = ( state = initialState, action ) => {
    let newState = { ...state }
    // console.log( newState );
    switch ( action.type ) {
        case "events_restaurant_success":
            newState.Events = action.payload.response.data
            newState.pageCount = action.payload.pageCount
            newState.message = "Events Success";
            return newState;
        case "events_restaurant_failed":
            newState.error = true;
            newState.message = "Events Failed"
            return newState;
        case "post_events_success":
            newState.postEvent = true;
            newState.Events.push( action.payload.response.data );
            newState.message = "Post Events Success";
            return newState;
        case "post_events_failed":
            newState.postEvent = false;
            newState.message = "Post Events Failed!"
            return newState;

        default:
            return newState;


    }
}

export default eventsReducer