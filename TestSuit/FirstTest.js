/**
 * Created by Ursa on 16.11.2016.
 */

var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('Task 3. Login admin panel', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
    });
    test.after(function() {
        driver.sleep('5000');  //Что бы успеть заметить конечное состояние
        driver.quit();
    });

    test.it('Открыть страницу авторизации', function() {
        driver.get('http://localhost/litecart/admin/');
        driver.findElement(By.name('username')).sendKeys('admin');  //.click().clear()
        driver.findElement(By.css('input[name="password"]')).sendKeys('admin');  //.click()
        driver.sleep('1000');  //Для визуальной отладки
        driver.findElement(By.name('login')).click();
        driver.wait(until.titleIs('My Store'), 1000); //Todo ожидать элемент
    });


});