import { combineReducers } from 'redux';
import userType from './userTypeReducer';
import UserFunctionsReducer from './UserFunctionsReducer';

export default combineReducers({
	userType,
	UserFunctionsReducer,
});
