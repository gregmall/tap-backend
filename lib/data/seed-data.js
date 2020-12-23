const SpinalTap = require('../model/spinal-tap');
const tapCharacters  = require('./tapCharacters');
const pool = require('../utils/pool');
const fs = require('fs');

pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

Promise.all(
  tapCharacters.map(character => {
    return SpinalTap.insert(character);

  })
);


