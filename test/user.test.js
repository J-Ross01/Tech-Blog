const { expect } = require('chai');
const { User } = require('../models/user'); 

describe('User Model', () => {
    it('should hash the password before saving', async () => {
        const userData = {
            username: 'testUser',
            email: 'test@example.com',
            password: 'password123'
        };

        const user = await User.create(userData);
        expect(user.password).to.not.equal('password123');
        expect(user.password.length).to.be.greaterThan('password123'.length);
    });
});

