let initialState = {
    Orders: [],
    orderPlaced: false,

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
        case "order_cancel_success":
            let temp = []
            for ( let i = 0; i < state.Orders.length; i++ ) {
                if ( state.Orders[ i ]._id === action.payload.response.data._id ) {
                    temp.push( action.payload.response.data )
                } else {
                    temp.push( state.Orders[ i ] )
                }
            }
            // state.Orders.map( order => {
            //     if ( order._id === action.payload.orderID ) {
            //         order.orderStatus = "Cancel"
            //         order.cancelled = "Yes"

            //     }
            // } )
            state.Orders = temp
            console.log( "state.temp", temp )
            state.message = "Order Cancelled";
            return state;
        case "order_cancel_failed":
            state.error = true;
            state.message = "Failed canceling Order"
            return state;

        default:
            return state;


    }
}

export default orders