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

    const generateCodeValid = async () => {      
        // Select the subject
        let subjectDropdown = await driver.findElement(By.id('subject'));
        console.log("Got subject drop down");
        await subjectDropdown.click();
        let subjectOption = await driver.findElement(By.xpath(`//li[@data-value="19CSE311"]`));
        await subjectOption.click();
        
        // Select the time slot
        let timeSlotDropdown = await driver.findElement(By.id('time'));
        await timeSlotDropdown.click();
        let timeSlotOption = await driver.findElement(By.xpath(`//li[@data-value="8:00 - 9:00"]`));
        await timeSlotOption.click();
      
        // Generate captcha
        let generateCaptchaButton = await driver.findElement(By.id('generate-captcha'));
        await generateCaptchaButton.click();
        await driver.wait(until.elementLocated(By.id('captchaDisplay')));
      
        // Get the captcha value
        let captchaDisplayElement = await driver.findElement(By.id('captchaDisplay'));
        let captchaValue = captchaDisplayElement.getText();
        console.log("Captcha value : ${captchaValue}")
        console.log(captchaValue);
      
        // Fill captcha field
        let captchaInput = await driver.findElement(By.id('captcha'));
        await captchaInput.sendKeys(captchaValue);
      
        // Generate code
        let generateCodeButton = await driver.findElement(By.id('generate-code-button'));
        await generateCodeButton.click();
      };
      
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

    it('Running Selenium script', async function () {
      this.timeout(30000);

      // Teacher login.
      await login('amit.verma@example.com', 'password1');
      let facultyAppbar = await driver.findElement(By.id('faculty-appbar'));

       await generateCodeValid();

    });
  });
}, { browsers: [Browser.CHROME] });
