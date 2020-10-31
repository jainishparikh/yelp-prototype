var connection = new require( './kafka/Connection' );
var mongoose = require( './config/db_config' );

//topics files

//users
var user_login = require( './services/users/user_login' );
var user_signup = require( './services/users/user_signup' );
var user_getall = require( './services/users/user_getall' );
var user_about_byEmail = require( './services/users/about_byEmail' );
var user_about_byID = require( './services/users/about_byID' );
var user_about_update = require( './services/users/about_update' );
var user_upload_picture = require( './services/users/upload_picture' );
var user_follow = require( './services/users/follow' );
var user_message = require( './services/users/message' );

//restaurants
var restaurant_login = require( './services/restuarants/restaurant_login' );
var restaurant_signup = require( './services/restuarants/restaurant_signup' );
var restaurant_getall = require( './services/restuarants/restaurant_getall' );
var restaurant_about_byEmail = require( './services/restuarants/about_byEmail' );
var restaurant_about_byID = require( './services/restuarants/about_byID' );
var restaurant_about_update = require( './services/restuarants/about_update' );
var restaurant_upload_picture = require( './services/restuarants/upload_picture' );
var dishes_getall = require( './services/restuarants/dishes_getall' );
var dishes_add = require( './services/restuarants/dishes_add' );
var dishes_update_wImage = require( './services/restuarants/dishes_update_wImage' );
var dishes_update_woImage = require( './services/restuarants/dishes_update_woImage' );
var restaurant_message = require( './services/restuarants/message' );

//orders
var order_byRestaurant = require( './services/orders/byRestaurants' );
var order_byUsers = require( './services/orders/byUsers' );
var order_placeOrder = require( './services/orders/placeOrder' );
var order_update = require( './services/orders/updateOrderStatus' );
var order_cancel = require( './services/orders/cancel' );

//events
var events_users = require( './services/events/events_users' );
var events_restaurants = require( './services/events/events_restaurants' );
var events_getall = require( './services/events/events_getall' );
var events_registered = require( './services/events/registered' );
var events_register = require( './services/events/events_register' );
var events_post = require( './services/events/events_post' );


//reviews
var review_add = require( './services/reviews/add' );
var review_users = require( './services/reviews/users' );
var review_restaurants = require( './services/reviews/restaurant' );


function handleTopicRequest ( topic_name, fname ) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer( topic_name );
    var producer = connection.getProducer();
    console.log( 'server is running ' );
    consumer.on( 'message', function ( message ) {
        console.log( 'message received for ' + topic_name + " ", fname );
        console.log( JSON.stringify( message.value ) );
        var data = JSON.parse( message.value );

        fname.handle_request( data.data, function ( err, res ) {
            console.log( 'after handle' + res );
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify( {
                        correlationId: data.correlationId,
                        data: res
                    } ),
                    partition: 0
                }
            ];
            producer.send( payloads, function ( err, data ) {
                console.log( data );
            } );
            return;
        } );

    } );
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

//users
handleTopicRequest( "user_login", user_login )
handleTopicRequest( "user_signup", user_signup )
handleTopicRequest( "user_getall", user_getall )
handleTopicRequest( "user_aboutbyEmail", user_about_byEmail )
handleTopicRequest( "user_aboutbyID", user_about_byID )
handleTopicRequest( "user_about", user_about_update )
handleTopicRequest( "upload_picture", user_upload_picture )
handleTopicRequest( "user_follow", user_follow )
handleTopicRequest( "user_message", user_message )

//restaurant
handleTopicRequest( "restaurant_login", restaurant_login )
handleTopicRequest( "restaurant_signup", restaurant_signup )
handleTopicRequest( "restaurant_getall", restaurant_getall )
handleTopicRequest( "restaurant_aboutbyEmail", restaurant_about_byEmail )
handleTopicRequest( "restaurant_aboutbyID", restaurant_about_byID )
handleTopicRequest( "restaurant_about", restaurant_about_update )
handleTopicRequest( "upload_picture", restaurant_upload_picture )
handleTopicRequest( "dishes_add", dishes_add )
handleTopicRequest( "dishes_getall", dishes_getall )
handleTopicRequest( "dishes_update_woImage", dishes_update_woImage )
handleTopicRequest( "dishes_update_wImage", dishes_update_wImage )
handleTopicRequest( "restaurant_message", restaurant_message )

//orders
handleTopicRequest( "order_byRestaurants", order_byRestaurant )
handleTopicRequest( "order_byUsers", order_byUsers )
handleTopicRequest( "order_placeOrder", order_placeOrder )
handleTopicRequest( "order_update", order_update )
handleTopicRequest( "order_cancel", order_cancel )

//events
handleTopicRequest( "events_getall", events_getall )
handleTopicRequest( "events_registered", events_registered )
handleTopicRequest( "events_register", events_register )
handleTopicRequest( "events_restaurants", events_restaurants )
handleTopicRequest( "events_users", events_users )
handleTopicRequest( "events_post", events_post )

//review
handleTopicRequest( "review_restaurants", review_restaurants )
handleTopicRequest( "review_users", review_users )
handleTopicRequest( "review_add", review_add )
