const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


const Tech = require('../models/Tech');

// @route GET api/techs
router.get('/', async (req, res) => {
  try{
    const techs = await Tech.find();
    // return res.status(200).send({});
    res.json(techs);
  } catch (err){
    console.error(err.message);
    res.status(500).send('server error!!!');
  }
});

// @route POST api/techs
router.post('/', [
  check('firstName', 'Please add a first name').not().isEmpty(),
  check('lastName', 'Please add a last name').not().isEmpty(),
  check('both').not().isEmpty()
],
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  // if passed:
  const { firstName, lastName, both } = req.body;
  
  try{
    let tech = await Tech.findOne({ both: both });

    if(tech){
      return res.status(400).json({ msg: 'Tech already exists'})
    }

    tech = new Tech({
      firstName: firstName,
      lastName: lastName,
      both: both
    })

    await tech.save();

    res.send('Tech created');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server Error!');
  }
});

// @route DELETE api/techs/:id
router.delete('/:id', async (req, res) => {
  try{
    let tech = await Tech.findById(req.params.id);

    if(!tech) return res.status(404).json({ msg: "tech does not exist"});

    await Tech.findByIdAndRemove(req.params.id);

    res.json({msg: "tech deleted"});

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;