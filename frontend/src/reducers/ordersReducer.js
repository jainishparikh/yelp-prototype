let initialState = {
    Orders: [],
    orderPlaced: false
}
var orders = ( state = initialState, action ) => {
    // console.log( state );
    switch ( action.type ) {
        case "order_fetch_success":
            state.Orders = action.payload.response.data;
            state.pageCount = Math.ceil( action.payload.response.data.length / action.payload.perPage )
            state.message = "Order Placed";
            return state;
        case "order_fetch_failed":
            state.error = true;
            state.message = "Failed fetching Order"
            return state;
        case "order_success":
            state.Orders.push( action.payload.response.data )
            state.orderPlaced = true;
            state.message = "Order Placed";
            return state;
        case "order_failed":
            state.error = true;
            state.message = "Failed Placing Order"
            return state;

        default:
            return state;


    }
}

export default orders