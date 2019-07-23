import { GET_LOGS, SET_LOADING, LOGS_ERROR, ADD_LOG, DELETE_LOG } from './types';

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

    const res = await fetch('/logs');
    const data = await res.json();
    dispatch({
      type: GET_LOGS,
      payload: data
    });

  }catch(err){
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    })
  }
   
}

// Add new log
export const addLog = (log) => async dispatch => {
  try{
    setLoading();

    const res = await fetch('/logs', {
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
      payload: err.response.data
    })
  }
}

// delete log
export const deleteLog = (id) => async dispatch => {
  try{
    setLoading();
    await fetch(`/logs/${id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: DELETE_LOG,
      payload: id
    });

  }catch(err){
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    })
  }
   
}


// set loading to true
export const setLoading = () => {
  return{   // returning to the reducer
    type: SET_LOADING
  }
}
