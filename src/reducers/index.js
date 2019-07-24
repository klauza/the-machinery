import { combineReducers } from 'redux'; 
import logReducer from './logReducer';
import techReducer from './techReducer';


export default combineReducers({  //takes an object with all reducers
  log: logReducer,
  tech: techReducer
});