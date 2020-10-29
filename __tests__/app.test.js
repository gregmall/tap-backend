const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const SpinalTap = require('../lib/model/spinal-tap');


describe('tap-backend routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  it('creates a character', async() => {
    const res = await request(app)
      .post('/api/v1/characters')
      .send({
        name: 'Steve',
        image: 'www.url.com',
        quote: 'Tap lives!',
        instrument: 'guitar'

      });
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Steve',
      image: 'www.url.com',
      quote: 'Tap lives!',
      instrument: 'guitar'
        
    });

  });
});
