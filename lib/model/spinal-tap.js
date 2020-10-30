const { query } = require('../utils/pool');
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
    this.role = row.role;
  }

  static async insert(character) {
    const { rows } = await pool.query(
      `INSERT INTO spinaltap (name, image, quote, role)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
      [character.name, character.image, character.quote, character.role]
    );
    return new SpinalTap(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM spinaltap'
    );
    
    return rows.map(row => new SpinalTap(row));
  }

}
module.exports = SpinalTap;

