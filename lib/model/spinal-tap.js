const pool = require('../utils/pool');

class SpinalTap {
  id;
  name;
  image;
  quote;
  role;

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

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM spinaltap WHERE id=$1',
      [id]
    );
    if(!rows) return null;
    else return new SpinalTap(rows[0]);
  }

  static async update(id, character) {
    const { rows } = await pool.query(
      `UPDATE spinaltap
       SET name=$1,
           image=$2,
           quote=$3,
           role=$4
       WHERE id = $5
       RETURNING *`,
      [character.name, character.image, character.quote,
        character.role, id]
    );
    return new SpinalTap(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM spinaltap WHERE id=$1 RETURNING *',
      [id]
    );

    return new SpinalTap(rows[0]);
  }

}
module.exports = SpinalTap;

