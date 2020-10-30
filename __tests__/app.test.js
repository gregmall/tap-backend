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
  it('gets all characters', async() => {
    const characters = await Promise.all([
      {
        name: 'Steve', 
        image: 'www.url.com',
        quote: 'Tap lives!',
        instrument: 'guitar'
      },
      {
        name: 'Lars', 
        image: 'www.rock.com',
        quote: 'ROCK AND ROLL!',
        instrument: 'bass'
      },
      {
        name: 'Benny', 
        image: 'www.page.com',
        quote: 'My girlfriend has 2 jobs',
        instrument: 'drums'
      }

    ].map(character => SpinalTap.insert(character)));

    return request(app)
      .get('/api/v1/characters')
      .then(res => {
        characters.forEach(character => {
          expect(res.body).toContainEqual(character);
        });
      });
  });

});

