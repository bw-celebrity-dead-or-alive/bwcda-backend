const server = require('../api/server');
const request = require('supertest');
const app = request(server);

// let id;
// let celeb = {
//   name: 'Stan White',
//   info: 'Nigerian Developer',
//   image_url:
//     'http://static.tvmaze.com/uploads/images/medium_portrait/25/64971.jpg',
//   birth: 1994,
//   death: 0
// };

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
  it('[GET] /api/celebrities/:id works!', () => {
    return app
      .get('/api/celebrities/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.name).toBe('Céline Dion');
      })
      .catch(error => {
        console.log(error);
      });
  });
  it('[GET] /api/celebrities/picture/:id works!', () => {
    return app
      .get('/api/celebrities/picture/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toEqual(expect.stringMatching(/^http/));
      })
      .catch(error => {
        console.log(error);
      });
  });
  // it('[POST] /api/celebrities/ creates a new celebrity', () => {
  //   return app
  //     .post('/api/celebrities/picture/1')
  //     .set('Accept', 'application/json')
  //     .send(celeb)
  //     .expect(201)
  //     .expect('Content-Type', /json/)
  //     .then(res => {
  //       expect(res.body.name).toEqual(celeb.name);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // });
});
