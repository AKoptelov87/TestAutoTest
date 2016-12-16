/**
 * Created by Ursa on 16.12.2016.
 */
var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    by = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    assert = require('assert');

test.describe('Task 13. Make a script with a basket', function () {
    var driver, startCount,
        productToAdd = [
            'Blue Duck',
            'Green Duck',
            'NewTestProduct'
        ];

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
        driver.findElement(by.css('span.quantity')).getText().then(function (count) {
            startCount = count;
            console.log(startCount);
        })
    });

    test.it('Добавить товар в корзину', function () {
        productToAdd.forEach(function (product) {
            startCount++;
            // Открываем страницу продукта и кликаем Добавить
            driver.findElement(by.xpath('//a[@title="' + product + '"]')).click();
            driver.findElement(by.name('add_cart_product')).click();
            // Ожидаем пока увеличится счетчик товара
            console.log(startCount);
            driver.wait(until.elementTextIs(driver.findElement(by.css('span.quantity')), startCount.toString()));
            driver.findElement(by.css('img[title="My Store"]')).click();
        });
    });

    test.it('Открыть корзину', function () {
        driver.findElement(by.css('#cart a.link')).click();
    });

    test.it('Удалить все товары из корзины', function () {
        driver.findElements(by.css('table.dataTable td.item'))
            .then(function (itemsInCart) {
                startCount = itemsInCart.length;
                console.log('Сейчас в корзине ' + startCount);
                itemsInCart.forEach(function (item) {
                    driver.findElement(by.name('remove_cart_item')).click();
                    driver.wait(until.stalenessOf(item), 10000);
                })
            })
    })
})