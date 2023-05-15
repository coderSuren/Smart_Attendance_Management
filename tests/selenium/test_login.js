const { By, Builder, Browser } = require('selenium-webdriver');
const { suite } = require('selenium-webdriver/testing');
const assert = require("assert");
const chrome = require('selenium-webdriver/chrome');
const { until } = require('selenium-webdriver');

suite(function (env) {
  describe('First script', function () {
    let driver;
    let service;

    this.timeout(10000);

    before(async function () {

      this.timeout(10000);

      service = new chrome.ServiceBuilder('chromedriver');
      driver = await new Builder().forBrowser('chrome').setChromeService(service).build();
    });

    after(async function () {
      // Close the browser
      await driver.quit();
    });

    const login = async (emailID, password) => {
      await driver.get('http://localhost:3000');

      let title = await driver.getTitle();
      console.log('Received title:', title);
      assert(title === "React App");

      // Test case 1 :: Login sequence for admin.
      await driver.findElement(By.id('email')).sendKeys("");
      await driver.findElement(By.id('password')).sendKeys("");
      await driver.findElement(By.id('email')).sendKeys(emailID);
      await driver.findElement(By.id('password')).sendKeys(password);

      let button = await driver.findElement(By.id('signinButton'));
      console.log(button);

      await button.click();
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Wait for the code element to be visible
      await driver.wait(until.elementIsVisible(driver.findElement(By.id('code'))));

      // Enter the 2FA code that was auto generated.
      let generatedcodeElement = await driver.findElement(By.id('generatedcode'));
      const generatedCode = await generatedcodeElement.getAttribute('value');
      console.log(generatedCode);

      await driver.findElement(By.id('code')).sendKeys(generatedCode);

      button = await driver.findElement(By.id('verifyCode'));

      await button.click();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    it('Running Selenium script', async function () {
      // Admin login.
      await login("admin1@example.com", "adminpassword1");
      let adminMenuAppbar = await driver.findElement(By.id('menu-appbar'));

      // Teacher login.
      await login("amit.verma@example.com", "password1");
      let facultyAppbar = await driver.findElement(By.id('faculty-appbar'));

      // Student login.
      await login("priya.singh@example.com", "password4");
      let studentAppbar = await driver.findElement(By.id('student-appbar'));
    });
  });

}, { browsers: [Browser.CHROME] });
