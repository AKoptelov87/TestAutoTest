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
    var driver, duckOnMainPage;

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

    test.it('Находим и проверяем первую уточку в категории Campaigns ', function (done) {
        var duckCell = driver.findElement(by.css('div#box-campaigns li.product')),
            //Получаем название и цены
            duckName = duckCell.findElement(by.css('div.name')),
            regPrice = duckCell.findElement(by.css('div.price-wrapper > .regular-price')),
            camPrice = duckCell.findElement(by.css('div.price-wrapper > .campaign-price'));

        Promise.all([
            duckName.getText(),
            regPrice.getText(),
            camPrice.getText()
        ]).then(function (texts) {
            console.log('Параметры уточки на главной странице: ' + texts);
            duckOnMainPage = texts
        });

        Promise.all([
            //старая цена
            regPrice.getTagName(),
            regPrice.getCssValue('color'),
            regPrice.getCssValue('text-decoration'),
            regPrice.getCssValue('font-size'),
            regPrice.getCssValue('font-weight'),

            //новая цена
            camPrice.getTagName(),
            camPrice.getCssValue('color'),
            camPrice.getCssValue('text-decoration'),
            camPrice.getCssValue('font-size'),
            camPrice.getCssValue('font-weight')
        ]).then(function (result) {
            console.log(result); //для отладки
            var errors = ['\nPезультаты проверки старой цены: '];
            // первая цена серая, зачёркнутая, маленькая
            if (result[0] !== 's') { errors.push('\n   некорректный тег') };
            if (result[1] !== 'rgba(119, 119, 119, 1)') { errors.push('\n   некорректный цвет') };
            if (result[2] !== 'line-through') { errors.push('\n   цена не зачеркнута') };
            if (result[3] !== '14.4px') { errors.push('\n   некорректный размер шрифта') };
            if (result[4] !== 'normal') { errors.push('\n   некорректная жирность шрифта') };

            errors.push('\nPезультаты проверки новой цены: ');
            // вторая цена красная, жирная, крупная
            if (result[5] !== 'strong') { errors.push('\n   некорректный тег') };
            if (result[6] !== 'rgba(204, 0, 0, 1)') { errors.push('\n   некорректный цвет') };
            if (result[7] !== 'none') { errors.push('\n   цена зачеркнута') };
            if (result[8] !== '18px') { errors.push('\n   некорректный размер шрифта') };
            if (result[9] !== 'bold') { errors.push('\n   некорректная жирность шрифта') };

            return errors.length != 2 ? done(errors) : done() ;
        });
    });

    test.it('Открыть страницу товара и проверить ту ли', function (done) {
        driver.findElement(by.css('div#box-campaigns li.product')).click();
        var duckCell = driver.findElement(by.css('div#box-product')),
            //Получаем название и цены
            duckName = duckCell.findElement(by.css('h1.title')),
            regPrice = duckCell.findElement(by.css('div.price-wrapper > .regular-price')),
            camPrice = duckCell.findElement(by.css('div.price-wrapper > .campaign-price'));

        Promise.all([
            duckName.getText(),
            regPrice.getText(),
            camPrice.getText()
        ]).then(function (duckOnSelfPage) {
            console.log('Параметры уточки на странице товара:  ' + duckOnSelfPage);
            console.log('Параметры уточки на главной странице: ' + duckOnMainPage);
            assert.deepEqual(duckOnSelfPage, duckOnMainPage, 'Открылась страница другой уточки!!! \n');
        }).catch(function (error) {
            done(error)
        });



        Promise.all([
            //старая цена
            regPrice.getTagName(),
            regPrice.getCssValue('color'),
            regPrice.getCssValue('text-decoration'),
            regPrice.getCssValue('font-size'),
            regPrice.getCssValue('font-weight'),

            //новая цена
            camPrice.getTagName(),
            camPrice.getCssValue('color'),
            camPrice.getCssValue('text-decoration'),
            camPrice.getCssValue('font-size'),
            camPrice.getCssValue('font-weight')
        ]).then(function (result) {
            console.log(result); //для отладки
            var errors = ['\nPезультаты проверки старой цены: '];
            // первая цена серая, зачёркнутая, маленькая
            if (result[0] !== 's') { errors.push('\n   некорректный тег') };
            if (result[1] !== 'rgba(102, 102, 102, 1)') { errors.push('\n   некорректный цвет') };
            if (result[2] !== 'line-through') { errors.push('\n   цена не зачеркнута') };
            if (result[3] !== '16px') { errors.push('\n   некорректный размер шрифта') };
            if (result[4] !== 'normal') { errors.push('\n   некорректная жирность шрифта') };

            errors.push('\nPезультаты проверки новой цены: ');
            // вторая цена красная, жирная, крупная
            if (result[5] !== 'strong') { errors.push('\n   некорректный тег') };
            if (result[6] !== 'rgba(204, 0, 0, 1)') { errors.push('\n   некорректный цвет') };
            if (result[7] !== 'none') { errors.push('\n   цена зачеркнута') };
            if (result[8] !== '22px') { errors.push('\n   некорректный размер шрифта') };
            if (result[9] !== 'bold') { errors.push('\n   некорректная жирность шрифта') };

            return errors.length != 2 ? done(errors) : done() ;
        });
    });
});