import { combineReducers } from 'redux';
import SignUpReducer from './SignUpReducer';
import loginReducer from './loginReducer';
import getUserProfileReducer from './getUserProfileReducer';

var rootReducer = combineReducers( {
    SignUpReducer: SignUpReducer,
    loginReducer: loginReducer,
    getUserProfileReducer: getUserProfileReducer,

} )
export default rootReducer