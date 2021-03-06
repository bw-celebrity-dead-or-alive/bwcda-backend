require('dotenv').config();
const jwt = require('jsonwebtoken');
const server = require('../api/server');
const request = require('supertest');
const app = request(server);
let id;
let token;
let score = {
  player_id: 4,
  score: 45
};

beforeAll(async () => {
  token = jwt.sign({ sub: 1, name: 'Stan White' }, process.env.JWT_SECRET, {
    expiresIn: '1day'
  });
});

describe('Leaderboard route', () => {
  it('[GET] /api/leaderboard', done => {
    return app
      .get('/api/leaderboard?page=1&limit=5')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.length).toBe(5);
        done();
      })
      .catch(error => {
        return done(error);
      });
  });
  it('[GET] /api/leaderboard/players/:id', done => {
    return app
      .get('/api/leaderboard/players/5')
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
        done();
      })
      .catch(error => {
        return done(error);
      });
  });
  it('[POST] /api/leaderboard/ add a score to the leaderboard', done => {
    return app
      .post('/api/leaderboard')
      .set('Accept', 'application/json')
      .send(score)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(res => {
        id = res.body.id;
        expect(res.body.score).toEqual(45);
        done();
      })
      .catch(error => {
        return done(error);
      });
  });
  it('[PUT] /api/leaderboard/:id update a score on the leaderboard', done => {
    return app
      .put(`/api/leaderboard/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({ score: 543 })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.score).toBe(543);
        done();
      })
      .catch(error => {
        return done(error);
      });
  });
  it('[DELETE] /api/leaderboard/:id removes a score from the leaderboard', done => {
    return app
      .delete(`/api/leaderboard/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.score).toBe(543);
        done();
      })
      .catch(error => {
        return done(error);
      });
  });
});
