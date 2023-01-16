import { combineReducers } from 'redux';
import DashboardReducer from './Dashboard/reducer';
import ForgetPassword from './ForgetPassword/reducer';
import Layout from './layout/reducer';
import Login from './login/reducer';
import loginError from './loginError/reducer';
import registration from './registration/reducer';
import UserReducer from './User/reducers';

const rootReducer = combineReducers({
  Login,
  registration,
  UserReducer,
  loginError,
  ForgetPassword,

  
  DashboardReducer,
  Layout,
});

export default rootReducer;
