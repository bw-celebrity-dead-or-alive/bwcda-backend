const server = require('../api/server');
const request = require('supertest');
const app = request(server);
const jwt = require('jsonwebtoken');

let id;
let token;

let player = {
  name: 'Stan White',
  email: 'stan@deal.com',
  password: '12345'
};

beforeAll(async () => {
  token = jwt.sign({ sub: 1, name: player.name }, process.env.JWT_SECRET, {
    expiresIn: '1day'
  });
});

describe('Players route', () => {
  it('[GET] /api/players', () => {
    return app
      .get('/api/players?page=1&limit=5')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.length).toBe(5);
      })
      .catch(error => {
        console.log(error);
      });
  });
  it('[GET] /api/players/:id', () => {
    return app
      .get('/api/players/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(Object.keys(res.body)).toEqual(
          expect.arrayContaining(['id', 'name', 'email', 'password'])
        );
      })
      .catch(error => {
        console.log(error);
      });
  });
  it('[GET] /api/players/:id/scores', () => {
    return app
      .get('/api/players/5/scores')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(Object.keys(res.body[0])).toEqual(
          expect.arrayContaining([
            'score',
            'player_id',
            'email',
            'name',
            'id',
            'created_at'
          ])
        );
      })
      .catch(error => {
        console.log(error);
      });
  });
  it('[POST] /api/auth/register adds a player to DB', () => {
    return app
      .post('/api/auth/register')
      .set('Accept', 'application/json')
      .send(player)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(res => {
        id = res.body.id;
        expect(res.body.name).toEqual('Stan White');
      })
      .catch(error => {
        console.log(error);
      });
  });
  it('[PUT] /api/players/:id update a player', () => {
    return app
      .put(`/api/players/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({ email: 'stan@dealing.com' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.email).toBe('stan@dealing.com');
      })
      .catch(error => {
        console.log(error);
      });
  });
  it('[DELETE] /api/players/:id removes a score from the leaderboard', () => {
    return app
      .delete(`/api/players/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.name).toBe(player.name);
      })
      .catch(error => {
        console.log(error);
      });
  });
});
