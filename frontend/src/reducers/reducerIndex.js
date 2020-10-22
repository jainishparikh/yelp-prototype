import { combineReducers } from 'redux';
import SignUpReducer from './SignUpReducer';
import loginReducer from './loginReducer';
import getUserProfileReducer from './UserReducers/getUserProfileReducer';
import eventsReducer from './UserReducers/eventsReducer';
import restaurantsReducer from './UserReducers/restaurantsReducer'
import orderReducer from './UserReducers/ordersReducer';
import restaurantProfileReducer from './RestaurantReducers/restaurantProfileReducer';
import restauranteventsReducer from './RestaurantReducers/eventsReducer';
import restaurantordersReducer from './RestaurantReducers/ordersReducer';
import restaurantreviewsReducer from './RestaurantReducers/reviewsReducer';
import usersReducer from './RestaurantReducers/usersReducer';

var rootReducer = combineReducers( {
    SignUpReducer: SignUpReducer,
    loginReducer: loginReducer,
    getUserProfileReducer: getUserProfileReducer,
    eventsReducer: eventsReducer,
    restaurantsReducer: restaurantsReducer,
    orderReducer: orderReducer,
    restaurantProfileReducer: restaurantProfileReducer,
    restauranteventsReducer: restauranteventsReducer,
    restaurantordersReducer: restaurantordersReducer,
    restaurantreviewsReducer: restaurantreviewsReducer,
    usersReducer: usersReducer,

} )
export default rootReducer