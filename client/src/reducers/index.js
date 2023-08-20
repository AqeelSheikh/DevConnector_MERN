import { combineReducers } from 'redux';
import alertReducer from './alert';
import authReducer from './auth';
import profile from './profile';
import post from './post';

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile,
  post,
});
