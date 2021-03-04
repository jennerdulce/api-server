'use strict';

// supertest, server.js, upergoose
require('@code-fellows/supergoose');
const supertest = require('supertest');
const server = require('../src/server.js');
const request = supertest(server.app);
const dogModel = require('../src/models/dog.js');
const birdModel = require('../src/models/bird.js');
const DataCollection = require('../src/models/data-collection-class');
const dogRoute = new DataCollection(dogModel);
const birdRoute = new DataCollection(birdModel);


describe('Server Testing for BIRD route functionality', () => {
  it('should return 404 on a bad route', async () => {
    await request.get('/birdssss')
      .then(result => {
        expect(result.status).toEqual(404);
      })
  })

  it('should return 404 on a bad route', async () => {
    await request.patch('/bird')
      .then(result => {
        expect(result.status).toEqual(404);
      })
  })

  it('should create a record using POST', async () => {
    const obj = {
      type: 'falcon',
      color: 'white/grey',
      age: 10
    }

    await request.post('/bird').send(obj)
      .then(result => {
        Object.keys(obj).forEach(key => {
          expect(result.body[key]).toEqual(obj[key]);
        })
        expect(result.status).toEqual(201);
      })
  })

  it('should read a list of records using GET', async () => {
    const obj = {
      type: 'Pidgeon',
      color: 'white/grey',
      age: 2
    }

    birdRoute.create(obj);
    await request.get('/bird')
      .then(result => {
        console.log(result.body);
        expect(result.body.length).toEqual(2);
        expect(result.status).toEqual(200);
      })
  })

  it('should read a list of records using GET', async () => {
    let idHolder;

    await birdRoute.read()
      .then(result => {
        idHolder = result[0]._id
        console.log(result[0]._id);
      })

    await request.get(`/bird/${idHolder}`)
      .then(result => {
        console.log(result.body);
        expect(result.body.type).toEqual('falcon');
        expect(result.status).toEqual(200);
      })
  })

  it('should Update a record using PUT', async () => {
    let idHolder;
    let newBird = {
      type: 'hawk',
      color: 'green',
      age: 5
    }

    // gets id of index @ 0
    await birdRoute.read()
      .then(result => {
        idHolder = result[0]._id
        console.log(result[0]._id);
      })

    await request.put(`/bird/${idHolder}`).send(newBird)
      .then(result => {
        console.log(result.body);
        Object.keys(newBird).forEach(key => {
          expect(result.body[key]).toEqual(newBird[key])
        })
        expect(result.body.type).toEqual('hawk');
        expect(result.status).toEqual(200);
      })
  })

  it('should DELETE a record using DELETE', async () => {
    let idHolder;

    // gets id of index @ 0
    await birdRoute.read()
      .then(result => {
        idHolder = result[0]._id
        console.log(result[0]._id);
      })

    await request.delete(`/bird/${idHolder}`)
      .then(result => {
        expect(result.status).toEqual(204);
      })

    await birdRoute.read()
      .then(result => {
        expect(result.length).toEqual(1);
      })
  })

})


// =======================================================

describe('Server Testing for DOG route functionality', () => {
  it('should return 404 on a bad route', async () => {
    await request.get('/dogssss')
      .then(result => {
        expect(result.status).toEqual(404);
      })
  })

  it('should return 404 on a bad route', async () => {
    await request.patch('/dog')
      .then(result => {
        expect(result.status).toEqual(404);
      })
  })

  it('should create a record using POST', async () => {
    const obj = {
      name: 'fang',
      breed: 'husky/malamute',
      age: 2
    }

    await request.post('/dog').send(obj)
      .then(result => {
        Object.keys(obj).forEach(key => {
          expect(result.body[key]).toEqual(obj[key]);
        })
        expect(result.status).toEqual(201);
      })
  })

  it('should read a list of records using GET', async () => {
    const obj = {
      name: 'shiro',
      breed: 'maltese',
      age: 2
    }

    dogRoute.create(obj);
    await request.get('/dog')
      .then(result => {
        console.log(result.body);
        expect(result.body.length).toEqual(2);
        expect(result.status).toEqual(200);
      })
  })

  it('should read a list of records using GET', async () => {
    let idHolder;

    await dogRoute.read()
      .then(result => {
        idHolder = result[0]._id
        console.log(result[0]._id);
      })

    await request.get(`/dog/${idHolder}`)
      .then(result => {
        console.log(result.body);
        expect(result.body.name).toEqual('fang');
        expect(result.status).toEqual(200);
      })
  })

  it('should Update a record using PUT', async () => {
    let idHolder;
    const newDog = {
      name: 'pearl',
      breed: 'husky',
      age: 1
    }

    // gets id of index @ 0
    await dogRoute.read()
      .then(result => {
        idHolder = result[0]._id
        console.log(result[0]._id);
      })

    await request.put(`/dog/${idHolder}`).send(newDog)
      .then(result => {
        console.log(result.body);
        Object.keys(newDog).forEach(key => {
          expect(result.body[key]).toEqual(newDog[key])
        })
        expect(result.status).toEqual(200);
      })
  })

  it('should DELETE a record using DELETE', async () => {
    let idHolder;

    // gets id of index @ 0
    await dogRoute.read()
      .then(result => {
        idHolder = result[0]._id
        console.log(result[0]._id);
      })

    await request.delete(`/dog/${idHolder}`)
      .then(result => {
        expect(result.status).toEqual(204);
      })

    await dogRoute.read()
      .then(result => {
        expect(result.length).toEqual(1);
      })
  })

})