import { GET_LOGS, SET_LOADING, LOGS_ERROR } from './types';

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



// set loading to true
export const setLoading = () => {
  return{   // returning to the reducer
    type: SET_LOADING
  }
}
