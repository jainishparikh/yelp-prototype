let initialState = {
    Orders: [],
    pageCount: 5,

}
var ordersReducer = ( state = initialState, action ) => {
    let newState = { ...state }
    // console.log( newState );
    switch ( action.type ) {
        case "orders_restaurant_success":
            newState.Orders = action.payload.response.data
            newState.pageCount = action.payload.pageCount
            newState.message = "Orders Success";
            return newState;
        case "orders_restaurant_failed":
            newState.error = true;
            newState.message = "Orders Failed"
            return newState;
        case "orders_restaurant_update_success":
            let temp = []
            for ( let i = 0; i < newState.Orders.length; i++ ) {
                if ( newState.Orders[ i ]._id === action.payload.response.data._id ) {
                    temp.push( action.payload.response.data )
                } else {
                    temp.push( newState.Orders[ i ] )
                }
            }
            newState.Orders = temp;
            newState.message = "Order Status Update Success!";
            return newState;
        case "orders_restaurant_update_failed":
            newState.message = "Order Status Update Failed!"
            return newState;

        default:
            return newState;


    }
}

export default ordersReducer