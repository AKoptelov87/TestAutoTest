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
        var loginField = driver.findElement(By.name('username')),
            passField = driver.findElement(By.css('input[name="password"]')),
            submitButton = driver.findElement(By.name('login'));
        //Ввели логин
        loginField.click();
        loginField.clear();
        loginField.sendKeys('admin');
        //Ввели пароль
        passField.click();
        passField.clear();
        passField.sendKeys('admin');
        //Нажали кнопку вход
        submitButton.click();
        //
        driver.wait(driver.findElement(By.css('td#sidebar')).isDisplayed(), 10000);
    });


});