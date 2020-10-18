let initialState = {
    Events: [],
    RegisteredEvents: [],
}
var events = ( state = initialState, action ) => {
    // console.log( state );
    switch ( action.type ) {
        case "events_success":
            state.Events = action.payload.response.data
            state.message = "Events Success";
            return state;
        case "events_failed":
            state.error = true;
            state.message = "Events Failed"
            return state;
        case "registered_events_success":
            state.RegisteredEvents = action.payload.response.data
            state.message = "Registered Events Success";
            return state;
        case "registered_events_failed":
            state.error = true;
            state.message = "Registered Events Failed!"
            return state;
        default:
            return state;


    }
}

export default events