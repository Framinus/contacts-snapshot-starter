const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const app = require('../../src/server');

chai.use(chaiHttp);

describe('get / route', function () {
  it('should a status code of 200', function () {
    return chai.request(app)
      .get('/')
      .then((res) => {
        console.log("inside test response")
        expect(res).to.have.status(200)
      });
  });
});
