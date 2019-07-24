const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Tech = require('../models/Tech');
const Logs = require('../models/Logs');

// @route GET api/logs
router.get('/', async (req, res) => {
  try{
    const logs = await Logs.find().sort({ createdAt: 'desc'});
    // return res.status(200).send({});
    res.json(logs);
  } catch (err){
    console.error(err.message);
    res.status(500).send('server error!!');
  }
});

// @route POST api/logs
router.post('/', [
  check('message', 'Please add a message').not().isEmpty()
],
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }
  const { message, tech, attention, date } = req.body;

  try{
    let newLog = new Logs({
      message: message,
      tech: tech,
      attention: attention,
      date: date
    });

    await newLog.save();
    res.send('log created');
    // res.json(log);

  } catch (err){
    console.error(err.message);
    res.status(500).send('serv error!!!');
  }
  res.send('Add log');

});

// @route PUT api/logs/:id
router.put('/:id', async (req, res) => {
  const {message, tech, attention, date} = req.body;

  const logFields = {};
  if(message) logFields.message = message;
  if(tech) logFields.tech = tech;
  if(attention) logFields.attention = attention;
  if(date) logFields.date = date;

  try{
    let log = await Logs.findById(req.params.id);

    if(!log) return res.status(404).json({msg: 'contact not found ! '});

    log = await Logs.findByIdAndUpdate(
      req.params.id,
      { $set: logFields},
      { new: true }
    );

    res.json(log);

  } catch(err){
    console.error(err.message);
    res.status(500).send('serv error!');
  }

  res.send('Update log');
});


// @route DELETE api/logs/:id
router.delete('/:id', async (req, res) => {
  try{
    let log = await Logs.findById(req.params.id);

    if(!log) return res.status(404).json({ msg: "log does not exist"});

    await Logs.findByIdAndRemove(req.params.id);

    res.json({msg: "log deleted"});

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;