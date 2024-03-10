const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app'); 

chai.use(chaiHttp);

describe('User Routes', () => {
    describe('POST /users/register', () => {
        it('should register a new user', (done) => {
            chai.request(app)
                .post('/users/register')
                .send({
                    username: 'newUser',
                    email: 'newuser@example.com',
                    password: 'password123'
                })
                .end((err, res) => {
                    expect(res).to.have.status(302); 
                    done();
                });
        });
    });

});
