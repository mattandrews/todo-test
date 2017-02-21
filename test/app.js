'use strict';
process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);

describe('/POST something', () => {
    it('should not allow invalid requests', (done) => {
        let invalidData = {
            name: 'Nope',
        };
        chai.request(server)
            .post('/test')
            .send(invalidData)
            .set('Accept', 'application/json')
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('should allow valid requests', (done) => {
        let validData = {
            something: 'Test data',
        };
        chai.request(server)
            .post('/test')
            .send(validData)
            .set('Accept', 'application/json')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
