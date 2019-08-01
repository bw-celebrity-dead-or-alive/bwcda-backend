const server = require('../api/server');
const request = require('supertest');
const app = request(server);

describe('Server', () => {
  it('[GET] / works!', () => {
    return app
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toBe('Api exposed at /api');
      });
  });
});
