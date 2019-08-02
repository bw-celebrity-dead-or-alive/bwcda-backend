const server = require('../api/server');
const request = require('supertest');
const app = request(server);
const jwt = require('jsonwebtoken');

let id;
let token;
let celeb = {
  name: 'Mini White',
  info: 'Nigerian Developer',
  image_url:
    'http://static.tvmaze.com/uploads/images/medium_portrait/25/64971.jpg',
  birth: 1994,
  death: 0
};
// let celeb = {
//   "name": "Ricky Gervais",
//   "info": "British comedian, actor and filmmaker",
//   "image_url": null,
//   "birth": 1961,
//   "death": 0
// }

beforeAll(async () => {
  token = jwt.sign({ sub: 1, name: 'Mini White' }, process.env.JWT_SECRET, {
    expiresIn: '1day'
  });
});

describe('Celebrity route', () => {
  it('[GET] /api/celebrities works!', done => {
    return app
      .get('/api/celebrities')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.length).toBe(15);
        done();
      })
      .catch(error => {
        return done(error);
      });
  });
  it('[GET] /api/celebrities/:id works!', done => {
    return app
      .get('/api/celebrities/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.name).toBe('Céline Dion');
        done();
      })
      .catch(error => {
        return done(error);
      });
  });
  it('[GET] /api/celebrities/picture/:id works!', done => {
    return app
      .get('/api/celebrities/picture/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toEqual(expect.stringMatching(/^http/));
        done();
      })
      .catch(error => {
        return done(error);
      });
  });
  it('[POST] /api/celebrities creates a new celebrity', done => {
    return app
      .post('/api/celebrities')
      .set('Accept', 'application/json')
      .send(celeb)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(res => {
        id = res.body.id;
        expect(res.body.name).toEqual('Mini White');
        done();
      })
      .catch(error => {
        return done(error);
      });
  });
  it('[PUT] /api/celebrities/:id update a celebrity', done => {
    return app
      .put(`/api/celebrities/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({ birth: 2000 })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.birth).toBe(2000);
        done();
      })
      .catch(error => {
        return done(error);
      });
  });
  it('[DELETE] /api/celebrities/:id removes a celebrity from the DB', done => {
    return app
      .delete(`/api/celebrities/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.name).toBe(celeb.name);
        done();
      })
      .catch(error => {
        return done(error);
      });
  });
});
