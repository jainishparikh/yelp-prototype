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
handleTopicRequest( "user_login", user_login )
handleTopicRequest( "user_signup", user_signup )
handleTopicRequest( "user_getall", user_getall )
handleTopicRequest( "user_aboutbyEmail", user_about_byEmail )
handleTopicRequest( "user_aboutbyID", user_about_byID )
handleTopicRequest( "user_about", user_about_update )
handleTopicRequest( "upload_picture", user_upload_picture )
handleTopicRequest( "user_follow", user_follow )
handleTopicRequest( "user_message", user_message )