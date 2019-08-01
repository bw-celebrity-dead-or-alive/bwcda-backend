const server = require('../api/server');
const request = require('supertest');
console.log(process.env.NODE_ENV);
describe('Server', () => {
  it('[GET] / works!', () => {
    return request(server)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});
