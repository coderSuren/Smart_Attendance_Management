const {By, Builder, Browser} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require("assert");
const chrome = require('selenium-webdriver/chrome');

suite(function (env) {
  describe('First script', function () {
    let driver;
    let service;

    before(async function () {
        service = new chrome.ServiceBuilder('chromedriver');
        driver = await new Builder().forBrowser('chrome').setChromeService(service).build();
    });

    after(async () => await driver.quit());
    
    it('First Selenium script', async function () {
      await driver.get('http://localhost:3000');

      let title = await driver.getTitle();
      console.log('recieved title:: ', title);
      assert(title === "React App");
      await driver.manage().setTimeouts({implicit: 1000000});

      driver.findElement(By.id('email')).sendKeys("admin1@example.com");
      driver.findElement(By.id('password')).sendKeys("adminpassword1");
      
    });
  });
}, { browsers: [Browser.CHROME]});