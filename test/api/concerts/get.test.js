const chai = require('chai');
const chaiHttp = require('chai-http');
const Concert = require('../../../models/concert.model');
const server = require('../../../server');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConc1 = new Concert({
      _id: '5d9f1140f10a81216cfd4408',
      performer: 'Performer1',
      genre: 'Music1',
      price: 30,
      day: 1,
      image: 'test.jpg'
    });
    await testConc1.save();

    const testConc2 = new Concert({
      _id: '5d9f1159f81ce8d1ef2bee48',
      performer: 'Performer2',
      genre: 'Music2',
      price: 35,
      day: 2,
      image: 'test.jpg'
    });
    await testConc2.save();

    const testConc3 = new Concert({
      _id: '5d9f1159f81ce8d1ef2bee49',
      performer: 'Performer3',
      genre: 'Music2',
      price: 40,
      day: 3,
      image: 'test.jpg'
    });
    await testConc3.save();

    const testConc4 = new Concert({
      _id: '5d9f1159f81ce8d1ef2bee51',
      performer: 'Performer1',
      genre: 'Music1',
      price: 45,
      day: 2,
      image: 'test.jpg'
    });
    await testConc4.save();

    const testConc5 = new Concert({
      _id: '5d9f1140f10a81216cfd4419',
      performer: 'Performer3',
      genre: 'Music3',
      price: 45,
      day: 3,
      image: 'test.jpg'
    });
    await testConc5.save();
  });

  after(async () => {
    await Concert.deleteMany();
  });

  it('/should return all Concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(5);
  });

  it('/:id should return one Concert by :id ', async () => {
    const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/performer/:performer should return an array with concerts filtered by performer', async () => {
    const res = await request(server).get('/api/concerts/performer/Performer1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/genre/:genre should return an array with concerts filtered by genre ', async () => {
    const res = await request(server).get('/api/concerts/genre/Music2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/price/:price_min/:price_max should return an array with concerts filtered by price ', async () => {
    const res = await request(server).get('/api/concerts/price/30/40');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
  });

  it('/day/:day should return an array with concerts filtered by day ', async () => {
    const res = await request(server).get('/api/concerts/day/3');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

});