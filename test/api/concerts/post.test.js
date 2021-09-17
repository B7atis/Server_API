const chai = require('chai');
const chaiHttp = require('chai-http');
const Concert = require('../../../models/concert.model');
const server = require('../../../server');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/concerts', () => {
  it('/should insert new document to db and return success', async () => {
    const res = await request(server).post('/api/Concerts').send({
      performer: 'Performer3',
      genre: 'Music2',
      price: 40,
      day: 3,
      image: 'test.jpg'
    });
    const newConcert = await Concert.findOne({
      day: 3,
      performer: 'Performer3',
    });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(newConcert).to.not.be.null;
  });

  after(async () => {
    await Concert.deleteMany();
  });
});