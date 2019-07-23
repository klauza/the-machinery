import { combineReducers } from 'redux'; 
import logReducer from './logReducer';


export default combineReducers({  //takes an object with all reducers
  log: logReducer
});