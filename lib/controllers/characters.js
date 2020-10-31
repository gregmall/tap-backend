const { Router } = require('express');
const SpinalTap = require('../model/spinal-tap');

module.exports = Router()
  .post('/', (req, res, next) => {
   
    SpinalTap
      .insert(req.body)
      .then(character => res.send(character))
      .catch(next);
  })

  .get('/', (req, res, next) => {

    SpinalTap
      .find()
      .then(characters => res.send(characters))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {

    SpinalTap
      .findById(req.params.id)
      .then(character => res.send(character))
      .catch(next);
  })

  .put('/:id', (req, res) => {

    SpinalTap
      .update(req.params.id, req.body)
      .then(character => res.send(character));
  })

  .delete('/:id', (req, res) => {

    SpinalTap
      .delete(req.params.id)
      .then(character => res.send(character));
  });
