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
        role: 'guitar'

      });
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Steve',
      image: 'www.url.com',
      quote: 'Tap lives!',
      role: 'guitar'
        
    });

  });
  it('gets all characters', async() => {
    const characters = await Promise.all([
      {
        name: 'Steve', 
        image: 'www.url.com',
        quote: 'Tap lives!',
        role: 'guitar'
      },
      {
        name: 'Lars', 
        image: 'www.rock.com',
        quote: 'ROCK AND ROLL!',
        role: 'bass'
      },
      {
        name: 'Benny', 
        image: 'www.page.com',
        quote: 'My girlfriend has 2 jobs',
        role: 'drums'
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

  it('gets a character by id ', async() => {
    const character = await SpinalTap.insert({
      name: 'Steve',
      image: 'www.url.com',
      quote: 'Tap lives!',
      role: 'guitar'

    });
    const response = await request(app)
      .get(`/api/v1/characters/${character.id}`);

    expect(response.body).toEqual(character);
    
  });

  it('updates a character by id', async() => {
    const character = await SpinalTap.insert({
      name: 'Steve',
      image: 'www.url.com',
      quote: 'Tap lives!',
      role: 'guitar'

    });

    return request(app)
      .put(`/api/v1/characters/${character.id}`)
      .send({

        name: 'Steve',
        image: 'www.url.com',
        quote: 'Tap lives forever!!',
        role: 'guitar, vocals'
      })
      .then(res => {
        expect(res.body).toEqual({

          id: expect.any(String),
          name: 'Steve',
          image: 'www.url.com',
          quote: 'Tap lives forever!!',
          role: 'guitar, vocals'

        });
      });
  });

  it('deletes a character by id', async() => {
    const character = await SpinalTap.insert({
     
      name: 'Steve',
      image: 'www.url.com',
      quote: 'Tap lives!',
      role: 'guitar'

    });
 
    const response = await request(app)
      .delete(`/api/v1/characters/${character.id}`);
    

    expect(response.body).toEqual(character);
  });

});

