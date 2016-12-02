/**
 * Created by Anton.Koptelov on 01.12.2016.
 */

var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    by = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    assert = require('assert');

test.describe('Task 8. Find stickers', function () {
    var driver, error = [];

    test.before(function () {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
    });
    test.after(function () {
        driver.sleep('5000');  //Что бы успеть заметить конечное состояние
        driver.quit();
    });

    test.it('Открыть главную страницу', function () {
        driver.get('http://localhost/litecart/');
        driver.findElement(by.css('div#logotype-wrapper'));
    });

    test.it('Находим всех уточек и их стикеры', function () {
        driver.findElements(by.css('div.image-wrapper'))
            .then(function (ducks) {
                ducks.forEach(function (someDuck) {
                    someDuck.findElement(by.xpath('../div[@class="name"]')).getText()
                        .then(function (duckName) {
                            console.log('Проверяем:' + duckName);
                            return duckName;
                        })
                        .then(function (duckName) {
                            someDuck.findElements(by.css('div.sticker'))
                                .then(function (stickers) {
                                    result = "У товара "+ duckName +" найдено " + stickers.length + "стикеров";
                                    console.log( result);
                                    if (stickers.length === 0 || stickers.length > 1) {
                                          error.push(result);
                                    }
                                })
                        })
                })
            })
    });

    test.it('Проверяем наличие ошибок ', function () {
        console.log(error);
        assert.equal(error.length, 0);

    })
});