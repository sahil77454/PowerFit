const { Builder } = require('selenium-webdriver');

(async function test() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:5000');   // your running PowerFit app
    console.log("PowerFit opened successfully");
    await driver.quit();
})();