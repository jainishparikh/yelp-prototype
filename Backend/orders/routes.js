var express = require( 'express' );
const { route } = require( '../reviews/routes' );
var router = express.Router();
var mongoose = require( '../config/db_config' );
var orderSchema = require( "../models/order" );
var { secret } = require( '../config/config' )
var { auth, checkAuth } = require( '../config/passport' )
auth();

//get orders by restaurants
router.get( '/restaurants/:id', checkAuth, ( req, res ) => {

    orderSchema.find( { restaurantID: req.params.id } ).then( docs => {
        console.log( "Orders by Restaurant", docs )
        res.status( 200 ).send( JSON.stringify( docs ) )
    } ).catch( error => {
        console.log( "Error in Orders by Restaurant", error )
        res.status( 400 ).send( error )
    } )


} )


//get orders by users
router.get( '/users/:id', checkAuth, ( req, res ) => {

    orderSchema.find( { userID: req.params.id } ).then( docs => {
        console.log( "Orders by Restaurant", docs )
        res.status( 200 ).send( JSON.stringify( docs ) )
    } ).catch( error => {
        console.log( "Error in Orders by Restaurant", error )
        res.status( 400 ).send( error )
    } )


} )

//post order by user
router.post( '/users/placeOrder', checkAuth, ( req, res ) => {

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
        res.status( 200 ).send( JSON.stringify( response ) )
    } ).catch( error => {
        console.log( "Error placing order", error )
        res.status( 400 ).send( error )
    } )


} )


//update order status by restaurant
router.put( '/restaurants/update/:id', checkAuth, ( req, res ) => {


    orderSchema.findOneAndUpdate( { _id: req.params.id }, { $set: { orderStatus: req.body.orderStatus } } ).then( response => {
        console.log( "Update success", response )
        res.status( 200 ).send( response )
    } ).catch( error => {
        console.log( "Error updating orderstatus", error )
        res.status( 400 ).send( error )
    } )

} )


//update/cancel order status by restaurant
router.put( '/users/cancel/:id', checkAuth, ( req, res ) => {

    orderSchema.findOneAndUpdate( { _id: req.params.id },
        { $set: { orderStatus: req.body.orderStatus, cancelled: "Yes" } }
    ).then( response => {
        console.log( "Update/Cancel success", response )
        res.status( 200 ).send( response )
    } ).catch( error => {
        console.log( "Error updating orderstatus", error )
        res.status( 400 ).send( error )
    } )
} )


module.exports = router