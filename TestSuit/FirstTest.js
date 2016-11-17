/**
 * Created by Ursa on 16.11.2016.
 */

var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('Google Search', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
    });

    test.it('should append query to title', function() {
        driver.get('http://www.google.com');
        driver.findElement(By.name('q')).sendKeys('webdriver');
        driver.findElement(By.name('btnG')).click();
        driver.wait(until.titleIs('webdriver - Поиск в Google'), 1000);
    });

    test.after(function() {
        driver.quit();
    });
});