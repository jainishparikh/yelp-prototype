let initialState = {
    Events: [],
    RegisteredEvents: [],
}
var events = ( state = initialState, action ) => {
    let newState = { ...state }
    // console.log( newState );
    switch ( action.type ) {
        case "events_success":
            newState.Events = action.payload.response.data
            newState.message = "Events Success";
            return newState;
        case "events_failed":
            newState.error = true;
            newState.message = "Events Failed"
            return newState;
        case "registered_events_success":
            newState.RegisteredEvents = action.payload.response.data
            newState.message = "Registered Events Success";
            return newState;
        case "registered_events_failed":
            newState.error = true;
            newState.message = "Registered Events Failed!"
            return newState;
        default:
            return newState;


    }
}

export default events