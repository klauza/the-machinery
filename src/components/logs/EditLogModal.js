import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateLog } from '../../actions/logActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import TechSelectOptions from '../techs/TechSelectOptions';

const EditLogModal = ({ current, updateLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  useEffect(() => {   // fill the form with 'current state'
    if(current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);

  const onSubmit = () => {
    if(message === '' || tech === ''){
      M.toast({ html: 'Please enter a message and technician '})
    } else {
      const updLog = {
        id: current.id,
        message,
        attention,
        tech,
        date: new Date()
      }

      updateLog(updLog);
      M.toast({ html: `Log updated by ${tech}`});

      // clear fields
      setMessage('');
      setTech('');
      setAttention(false);
    }
  };

  return (
    <div id='edit-log-modal' className="modal" style={modalStyle}>

      <div className="modal-content">
        <h4>Enter System Log</h4>

        <div className="row">
          <div className="input-field">
            <input type="text" name="message" value={message} onChange={e => setMessage(e.target.value)} />
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <select name="tech" value={tech} className="browser-default" onChange={e => setTech(e.target.value)}>
              <option value="" disabled>Select Technician</option>
              <TechSelectOptions/>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input type="checkbox" className="filled-in" checked={attention} value={attention} onChange={e => setAttention(!attention)} />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <a href="#!" onClick={onSubmit} className="modal-close waves-effect waves-green btn">Enter</a>
      </div>
    </div>
  );
};


const modalStyle = {
  width: '75%',
  height: '75%'
};

const mapStateToProps = state => ({
  current: state.log.current
})
// we have to mapStateToProps because we need to bring the current value, with which we want to fill the form 
export default connect(mapStateToProps, {updateLog})(EditLogModal);
