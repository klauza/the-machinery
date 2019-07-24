const mongoose = require('mongoose');

const LogsSchema = mongoose.Schema({
  message:{
    type: String,
    required: true
  },
  tech:{
    type: String,
    required: true
  },
  attention:{
    type: Boolean,
    default: false
  },
  date:{
    type: Date,
    default: Date.now
  },
});


module.exports = mongoose.model('log', LogsSchema);