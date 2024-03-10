const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app'); 

chai.use(chaiHttp);

describe('User Controller', () => {
    it('should create a new user', (done) => {
        chai.request(app)
            .post('/users/register')
            .send({
                username: 'testUser',
                email: 'test@example.com',
                password: 'password123'
            })
            .end((err, res) => {
                expect(res).to.have.status(302); 
                done();
            });
    });
});
