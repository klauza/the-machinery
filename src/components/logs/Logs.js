import React, { useEffect } from 'react'
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import { connect } from 'react-redux';    // whenever you want to interact with redux from a component, you want to bring a 'connect'. So whenever you bring connect, you bring redux to that component
import { getLogs } from '../../actions/logActions';

const Logs = ({ log: {logs, loading}, getLogs }) => {

  useEffect(() => {
    getLogs();
    //eslint-disable-next-line
  }, []);

  if(loading || logs === null){
    return <Preloader />
  }

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System logs</h4>
      </li>
      {!loading && logs.length === 0 ? (<p className="center">No logs to show... </p>) 
      : (logs.map(log => <LogItem log={log} key={log.id} /> ))
      }
      
    </ul>
  )
}

// connect takes two things
// 1 mapstatetoprops - use it, if you want to get anything from your up level state. So you bring it as a prop
const mapStateToProps = state => ({
  log: state.log // log is just a name of prop, name it however you want. 
  // state.log pertains to our root reducer in reducers/index.js
  // it is a whole state

}) 
export default connect(mapStateToProps, { getLogs })(Logs); 
