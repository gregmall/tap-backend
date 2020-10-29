const pool = require('../utils/pool');

class SpinalTap {
  id;
  name;
  image;
  quote;
  instrument;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.image = row.image;
    this.quote = row.quote;
    this.instrument = row.instrument;
  }

  static async insert(character) {
    const { rows } = await pool.query(
      `INSERT INTO spinaltap (name, image, quote, instrument)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
      [character.name, character.image, character.quote, character.instrument]
    );
    return new SpinalTap(rows[0]);
  }

}
module.exports = SpinalTap;

