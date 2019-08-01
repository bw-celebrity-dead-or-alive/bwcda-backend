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
  // it('[GET] /api/celebrities/picture/:id', () => {
  //   return app
  //     .get('/api/celebrities/picture/1')
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .then(res => {
  //       expect(res.body).toEqual(expect.stringMatching(/^http/));
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // });
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
