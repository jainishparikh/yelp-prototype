import { combineReducers } from 'redux';
import SignUpReducer from './SignUpReducer';
import loginReducer from './loginReducer';
import getUserProfileReducer from './getUserProfileReducer';
import eventsReducer from './eventsReducer';
import restaurantsReducer from './restaurantsReducer'
import orderReducer from './ordersReducer';
import restaurantProfileReducer from './restaurantProfileReducer';

var rootReducer = combineReducers( {
    SignUpReducer: SignUpReducer,
    loginReducer: loginReducer,
    getUserProfileReducer: getUserProfileReducer,
    eventsReducer: eventsReducer,
    restaurantsReducer: restaurantsReducer,
    orderReducer: orderReducer,
    restaurantProfileReducer: restaurantProfileReducer,

} )
export default rootReducer