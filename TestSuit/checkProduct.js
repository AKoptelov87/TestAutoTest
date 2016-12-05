/**
 * Created by Ursa on 04.12.2016.
 */
var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    by = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    assert = require('assert');

test.describe('Task 10. Check that the correct product page opens', function () {
    var driver;

    test.before(function () {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
    });
    test.after(function () {
        driver.sleep('2000');  //Что бы успеть заметить конечное состояние
        driver.quit();
    });

    test.it('Открыть главную страницу', function () {
        driver.get('http://localhost/litecart/');
        driver.findElement(by.css('div#logotype-wrapper'));
    });

    test.it('Находим уточку', function () {

        var duck = driver.findElement(by.css('div#box-campaigns li.product')),
            oldPrice = duck.findElement(By.css('.regular-price')),
            newPrice = duck.findElement(By.css('.campaign-price')),
            // Сохранение текстовых значений
            nameAndPrice = Promise.all([duck.findElement(By.css('.name')).getText(), oldPrice.getText(), newPrice.getText()]),
            oldPriceStyle = Promise.all([oldPrice.getCssValue('color'), oldPrice.getCssValue('font-size'), oldPrice.getCssValue('text-decoration')]),
            newPriseStyle = Promise.all([newPrice.getCssValue('color'), newPrice.getCssValue('font-size'), newPrice.getCssValue('font-weight')]);


    });

    test.it('Открыть главную страницу', function () {

    });

    test.it('Открыть главную страницу', function () {

    });
});