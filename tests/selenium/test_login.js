const { By, Builder, Browser } = require('selenium-webdriver');
const { suite } = require('selenium-webdriver/testing');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const { until } = require('selenium-webdriver');

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

    const loginFailEmailPasswordMismatch = async (emailID, password) => {
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

      let codeElementCount = await driver.findElements(By.id('code'));
      assert(codeElementCount.length == 0);
    };

    const loginFailInvalid2FACode = async (emailID, password) => {
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
      await driver.findElement(By.id('code')).sendKeys("_______INVALID CODE_________");

      button = await driver.findElement(By.id('verifyCode'));
      await button.click();
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // If the verify code element still exists, it means the 2FA code entered was wrong.
      let verifyCodeElements = await driver.findElements(By.id('verifyCode'));
      assert(verifyCodeElements.length != 0);
    };

    it('Running Selenium script', async function () {
      this.timeout(30000);

      // Check for failed logins (i.e password and email mismatch).
      await loginFailEmailPasswordMismatch('adminsfsdfsdfsdf1@example.com', 'adminpassword1');
      await loginFailEmailPasswordMismatch('admin1@example.com', 'adminpasdfsdfdfsword1');

      // Check for failed attempts (invalid 2FA code entered).
      await loginFailInvalid2FACode('admin1@example.com', 'adminpassword1');

      // Check for succesful logins.
      // Admin login.
      await login('admin1@example.com', 'adminpassword1');
      let adminMenuAppbar = await driver.findElement(By.id('menu-appbar'));

      // Teacher login.
      await login('amit.verma@example.com', 'password1');
      let facultyAppbar = await driver.findElement(By.id('faculty-appbar'));

      // Student login.
      await login('priya.singh@example.com', 'password4');
      let studentAppbar = await driver.findElement(By.id('student-appbar'));
    });
  });
}, { browsers: [Browser.CHROME] });
