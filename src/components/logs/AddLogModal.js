import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { addLog } from '../../actions/logActions';
import TechSelectOptions from '../techs/TechSelectOptions';


const AddLogModal = ({ addLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');
  const [bay, setBay] = useState('');

  const onSubmit = () => {
    if(message === '' || tech === '' || bay === ''){
      M.toast({ html: 'Please put all data'})
    } else {
      const newLog = {
        message,
        attention,
        tech,
        bay,
        date: new Date()
      }
      addLog(newLog);

      M.toast({ html: `Log added by ${tech} `});
      // clear fields
      setMessage('');
      setTech('');
      setAttention(false);
      setBay('');
    }
  }

  return (
    <div id='add-log-modal' className="modal" style={modalStyle}>

      <div className="modal-content">
        <h4>Create new task</h4>

        <div className="row">
          <div className="input-field">
            <input type="text" name="message" value={message} onChange={e => setMessage(e.target.value)} />
            <label htmlFor="message" className="active">
              Message
            </label>
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
        <a href="#!" onClick={onSubmit} className="modal-close waves-effect waves-green btn">Create</a>
      </div>
    </div>
  );
};


const modalStyle = {
  width: '75%',
  height: '75%'
};
// we dont bring any state here, we just call an action
export default connect(null, {addLog} )(AddLogModal);  // 'null' for mapStateToProps
