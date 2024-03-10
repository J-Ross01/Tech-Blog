const puppeteer = require('puppeteer');
const { expect } = require('chai'); 

describe('Signup Page', function() { 
    this.timeout(10000); 

    it('should render signup form', async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/signup');

        const form = await page.$('#signupForm');
        expect(form).to.not.be.null; 
        await browser.close();
    });
});
