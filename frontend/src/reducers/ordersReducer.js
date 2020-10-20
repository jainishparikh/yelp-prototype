let initialState = {
    Orders: [],
    orderPlaced: false,

}
var orders = ( state = initialState, action ) => {
    let newState = { ...state }
    // console.log( newState );
    switch ( action.type ) {
        case "order_fetch_success":
            newState.Orders = action.payload.response.data;
            newState.pageCount = Math.ceil( action.payload.response.data.length / action.payload.perPage )
            newState.message = "Order Placed";
            return newState;
        case "order_fetch_failed":
            newState.error = true;
            newState.message = "Failed fetching Order"
            return newState;
        case "order_success":
            newState.Orders.push( action.payload.response.data )
            newState.orderPlaced = true;
            newState.message = "Order Placed";
            return newState;
        case "order_failed":
            newState.error = true;
            newState.message = "Failed Placing Order"
            return newState;
        case "order_cancel_success":
            let temp = []
            for ( let i = 0; i < newState.Orders.length; i++ ) {
                if ( newState.Orders[ i ]._id === action.payload.response.data._id ) {
                    temp.push( action.payload.response.data )
                } else {
                    temp.push( newState.Orders[ i ] )
                }
            }
            // newState.Orders.map( order => {
            //     if ( order._id === action.payload.orderID ) {
            //         order.orderStatus = "Cancel"
            //         order.cancelled = "Yes"

            //     }
            // } )
            newState.Orders = temp
            console.log( "newState.temp", temp )
            newState.message = "Order Cancelled";
            return newState;
        case "order_cancel_failed":
            newState.error = true;
            newState.message = "Failed canceling Order"
            return newState;

        default:
            return newState;


    }
}

export default orders