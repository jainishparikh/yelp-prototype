var mongoose = require( 'mongoose' );

// mongoose.Promise = global.Promise;


mongoose.connect( 'mongodb+srv://jainishp:cmpe273@cluster0.vcynn.mongodb.net/Yelp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useMongoClient: true
}, error => {
    if ( error ) {
        console.log( "Error Connecting to Mongo" );
    } else {
        console.log( "Connection to Database Successfull" );
    }
} )

// mongoose.connect( 'mongodb+srv://lab2_yelp:ncbtLvxQI7lgeNVP@cmpe273.ssspa.mongodb.net/yelp?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//     // useMongoClient: true
// }, error => {
//     if ( error ) {
//         console.log( "Error Connecting to Mongo" );
//     } else {
//         console.log( "Connection to Database Successfull" );
//     }
// } )


module.exports = {
    mongoose
}