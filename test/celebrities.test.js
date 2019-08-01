const server = require('../api/server');
const request = require('supertest');
const app = request(server);

describe('Celebrity route', () => {
  it('[GET] /api/celebrities works!', () => {
    return app
      .get('/api/celebrities')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.length).toBe(15);
      })
      .catch(error => {
        console.log(error);
      });
  });
});
