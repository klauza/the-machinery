import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteLog, setCurrent } from '../../actions/logActions';

import M from 'materialize-css/dist/js/materialize.min.js';

const LogItem = ({ log, deleteLog, setCurrent }) => {

  const onDelete = () => {
    deleteLog(log.id);
    M.toast({ html: 'Log deleted'});
  }
  return (
    <li className="collection-item">
     <div style={{display: 'inline-block', width: '60px'}}><i className="material-icons">{log.attention ? 'warning' : 'error_outline'}</i></div>
      <div style={{display: 'inline-block'}}>
        <a href="#edit-log-modal" className={`modal-trigger ${log.attention ? 'red-text' : 'blue-text'}`} onClick={() => setCurrent(log)}>{log.message}</a>
        <br/>
        <span className="grey-text">
          <span className="black-text">{log.bay}</span>
          {' '} last updated by {' '}
          <span className="black-text">{log.tech}</span>
          {' '} on <Moment format="MMMM Do YYYY, h:mm:ss a">{log.date}</Moment>
        </span>
      </div>
      <a href="#!" onClick={onDelete} className="secondary-content right-align" style={{display: 'inline-block', marginTop: '15px'}}>
        <i className="material-icons gre-text">delete</i>
      </a>
    </li>
  )
}

export default connect(null, { deleteLog, setCurrent })(LogItem);