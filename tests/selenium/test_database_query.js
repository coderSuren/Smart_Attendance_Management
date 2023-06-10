const { By, Builder, Browser } = require('selenium-webdriver');
const { suite } = require('selenium-webdriver/testing');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const { until } = require('selenium-webdriver');
const { checkPrime } = require('crypto');

suite(function (env) {
    describe('First script', function () {
        let driver;
        let service;

        before(async function () {
            this.timeout(10000);
            service = new chrome.ServiceBuilder('chromedriver');
            driver = await new Builder().forBrowser('chrome').setChromeService(service).build();
            driver.manage().setTimeouts({ script: 100000000000 });
        });

        after(async function () {
            // Close the browser
            this.timeout(10000);
            await driver.quit();
        });

        const login = async (emailID, password) => {
            await driver.get('http://localhost:3000');
            let title = await driver.getTitle();
            console.log('Received title:', title);
            assert(title === 'React App');

            // Test case 1 :: Login sequence for admin.
            await driver.findElement(By.id('email')).sendKeys(emailID);
            await driver.findElement(By.id('password')).sendKeys(password);

            let button = await driver.findElement(By.id('signinButton'));
            console.log(button);

            await button.click();
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await driver.wait(until.elementIsVisible(driver.findElement(By.id('code'))));

            // Enter the 2FA code that was auto-generated.
            let generatedcodeElement = await driver.findElement(By.id('generatedcode'));
            const generatedCode = await generatedcodeElement.getAttribute('value');
            console.log(generatedCode);

            await driver.findElement(By.id('code')).sendKeys(generatedCode);

            button = await driver.findElement(By.id('verifyCode'));

            await button.click();
        };

        const CheckQuery = async (query, isQueryInvalid) => {
            let invalidQueryField = await driver.findElements(By.id('queryField'));
            if (isQueryInvalid) {
                assert(invalidQueryField.length == 0);
            }
            else {
                assert(invalidQueryField.length != 0);
            }
        };

        it('Running Selenium script', async function () {
            this.timeout(30000);

            await login('admin1@example.com', 'adminpassword1');
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Go the query database page.
            let advancedOptionsButton = await driver.findElement(By.id('advanced'));
            console.log(advancedOptionsButton);
            await advancedOptionsButton.click();
            await new Promise((resolve) => setTimeout(resolve, 1000000));

            let button = await driver.findElement(By.id('Query Database'));
            await button.click();
            await new Promise((resolve) => setTimeout(resolve, 1000));

            await CheckQuery('SELECT * FROM Student', false);
        });
    });
}, { browsers: [Browser.CHROME] });
