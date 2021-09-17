const chai = require('chai');
const chaiHttp = require('chai-http');
const Concert = require('../../../models/concert.model');
const server = require('../../../server');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/concerts', () => {
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
  });

  after(async () => {
    await Concert.deleteMany();
  });

  it('/:id should delete chosen document and return success', async () => {
    const res = await request(server).delete(
      '/api/Concerts/5d9f1140f10a81216cfd4408'
    );
    const deletedConcert = await Concert.findOne({
      _id: '5d9f1140f10a81216cfd4408',
    });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(deletedConcert).to.be.null;
  });

});