import { GET_LOGS, SET_LOADING, LOGS_ERROR, ADD_LOG, DELETE_LOG, SET_CURRENT, CLEAR_CURRENT, UPDATE_LOG, SEARCH_LOGS} from './types';

// export const getLogs = () => {
//   // REDUX THUNK - allows us to return a function which get passed in a dispatch method which we pass to reducer 
//   return async (dispatch) => {    // redux thunk allows us to return a function directly
//     setLoading(); // sets loading to true

//     const res = await fetch('/logs');
//     const data = await.res.json();
//     dispatch({
//       type: GET_LOGS,
//       payload: data
//     });
//   }
// }
// after refactor:
export const getLogs = () => async dispatch => {
  
  try{
    setLoading();
    
    const res = await fetch('/api/logs');
    const data = await res.json();
    dispatch({
      type: GET_LOGS,
      payload: data
    });

  }catch(err){
    dispatch({
      type: LOGS_ERROR,
      payload: err.response
    })
  }
   
}

// Add new log
export const addLog = (log) => async dispatch => {
  try{
    setLoading();

    const res = await fetch('/api/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    dispatch({
      type: ADD_LOG,
      payload: data
    });

  }catch(err){
    dispatch({
      type: LOGS_ERROR,
      payload: err.response
    })
  }
}

// delete log
export const deleteLog = (id) => async dispatch => {
  try{
    setLoading();
    await fetch(`/api/logs/${id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: DELETE_LOG,
      payload: id
    });

  }catch(err){
    dispatch({
      type: LOGS_ERROR,
      payload: err.response
    })
  }
}

// update log on server
export const updateLog = (log) => async dispatch => {   // it takes updated version of log as a parameter
  try{
    setLoading();

    const res = await fetch(`/api/logs/${log.id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data
    });

  }catch(err){
    dispatch({
      type: LOGS_ERROR,
      payload: err.response
    })
  }
}

// search server logs
export const searchLogs = (text) => async dispatch => {
  try{
    setLoading();

    const res = await fetch(`/api/logs?q=${text}`);
    const data = await res.json();
    dispatch({
      type: SEARCH_LOGS,
      payload: data
    });

  }catch(err){
    dispatch({
      type: LOGS_ERROR,
      payload: err.response
    })
  }
   
}

// Set current log on Edit
export const setCurrent = log => {
  return{
    type: SET_CURRENT,
    payload: log
  }
}
// Clear current log on Edit
export const clearCurrent = () => {
  return{
    type: CLEAR_CURRENT
  }
}

// set loading to true
export const setLoading = () => {
  return{   // returning to the reducer
    type: SET_LOADING
  }
}
