/**
 * Created by Anton.Koptelov on 23.11.2016.
 */
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

    // chrome = require('selenium-webdriver/chrome'),
    // Firefox = require('selenium-webdriver/chrome'),
    // ie = require('selenium-webdriver/chrome');

test.describe('Chrome. Login admin panel', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
    });
    test.after(function() {
        driver.sleep('2000');  //Что бы успеть заметить конечное состояние
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

test.describe('Firefox. Login admin panel', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });
    test.after(function() {
        driver.sleep('2000');  //Что бы успеть заметить конечное состояние
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
        driver.sleep('1000');
        //
        driver.wait(driver.findElement(By.css('td#sidebar')).isDisplayed(), 10000);
    });
});

test.describe('IE. Login admin panel', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .forBrowser('ie')
            .build();
    });
    test.after(function() {
        driver.sleep('2000');  //Что бы успеть заметить конечное состояние
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