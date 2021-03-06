import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateLog } from '../../actions/logActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import TechSelectOptions from '../techs/TechSelectOptions';

const EditLogModal = ({ current, updateLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');
  const [bay, setBay] = useState('');

  useEffect(() => {   // fill the form with 'current state'
    if(current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
      setBay(current.bay);
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
        bay,
        date: new Date()
      }

      updateLog(updLog);
      M.toast({ html: `Log updated by ${tech}`});

      // clear fields
      setMessage('');
      setTech('');
      setAttention(false);
      setBay('');
    }
  };

  return (
    <div id='edit-log-modal' className="modal" style={modalStyle}>

      <div className="modal-content">
        <h4>Edit this task</h4>

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

        <div className="row">
          <div className="input-field">
            <select name="bay" value={bay} className="browser-default" onChange={e => setBay(e.target.value)}>
              <option value="" disabled>Select Bay</option>
                <option value={`Bay 1`}>Bay 1</option>
                <option value={`Bay 2`}>Bay 2</option>
                <option value={`Bay 3`}>Bay 3</option>
                <option value={`Bay 4`}>Bay 4</option>
                <option value={`Bay 5`}>Bay 5</option>
                <option value={`Bay 6`}>Bay 6</option>
                <option value={`Bay 7`}>Bay 7</option>
                <option value={`Bay 8`}>Bay 8</option>
            </select>
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
