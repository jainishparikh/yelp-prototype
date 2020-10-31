const orderSchema = require( '../../models/order' );



function handle_request ( msg, callback ) {
    let req = {
        body: msg
    }

    let ts = Date.now();

    let date_ob = new Date( ts );
    let date = date_ob.getDate().toString();
    let month = ( date_ob.getMonth() + 1 ).toString();
    let year = date_ob.getFullYear().toString();
    let time = date_ob.getHours().toString() + "-" + date_ob.getMinutes().toString() + "-" + date_ob.getSeconds().toString();
    let orderdate = year + "-" + month + "-" + date + "-" + time;


    var order = new orderSchema( {
        userID: req.body.userID,
        restaurantID: req.body.restaurantID,
        orderStatus: req.body.orderStatus,
        cancelled: "No",
        orderMethod: req.body.orderMethod,
        orderDate: orderdate,
        dishes: req.body.dishes
    } )

    order.save().then( response => {
        console.log( "Order placed", response )
        callback( null, response )
    } ).catch( error => {
        console.log( "Error placing order", error )
        callback( error, null )
    } )


}

exports.handle_request = handle_request;