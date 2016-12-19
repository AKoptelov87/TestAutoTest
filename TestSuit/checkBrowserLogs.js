/**
 * Created by Anton.Koptelov on 19.12.2016.
 */

var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    by = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    assert = require('assert');

test.describe('Task 17. Check the messages in the browser log', function () {
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

    test.it('Открыть страницу авторизации', function () {
        driver.get('http://localhost/litecart/admin/');
        driver.findElement(by.name('username'));
    });
    test.it('Авторизация админом', function () {
        var loginField = driver.findElement(by.name('username')),
            passField = driver.findElement(by.name('password')),
            submitButton = driver.findElement(by.name('login'));
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
        driver.wait(driver.findElement(by.css('td#sidebar')).isDisplayed(), 10000);
    });

    test.it('открыть меню Catalog', function () {
        driver.findElement(by.xpath('.//li[@id="app-"]/a/span[contains(text(),"Catalog")]')).click();
        driver.findElement(by.xpath('//td[@id="content"]/h1[contains(text(),"Catalog")]'));
    });

    test.xit('Открыть каталог', function () {
        driver.wait(until.elementLocated(by.xpath('//table[@class="dataTable"]//td[i[@class="fa fa-folder"]]/a')), 1000)
            .then(function () {
                driver.findElement(by.xpath('//table[@class="dataTable"]//td[i[@class="fa fa-folder"]]/a')).click()
            });
    });

    test.it('прокликать уток', function () {
        driver.findElements(by.css('table.dataTable td > img + a'))
            .then(function (ducks) {
                count = ducks.length;
                //так как все товары снизу - перебираем с конца, но последняя строка - футер
                for (var i = 2; i <= count+1; i++){
                    driver.findElement(by.css('table.dataTable tr:nth-last-child('+i+') img + a')).click();
                    //проверяем логи и запоминаем название
                    Promise.all([
                        driver.manage().logs().get('browser'),
                        driver.findElement(by.css('h1')).getText()
                    ]).then(function (result) {
                        //закидываем все в массивчик
                        error.push(result)
                    });
                    driver.findElement(by.name('cancel')).click();
                }
            })
            .then(function () {
                for (var i = 0; i < error.length; i++){
                    console.log(error[i][1] + '; Logs: ' + error[i][0]);
                    //проверяем  полученный массив на ошибки на страницах товаров
                    assert.equal(error[i][0].length, 0, 'console not empty when ' + error[i][1]);
                }
            })
    });

    test.it('Проверка, что полученный общий лог браузера не содержит ошибок', function () {
        driver.manage().logs().get('browser')
            .then(function (browserLog) {
                console.log('\n итоговая консолька браузера: '+browserLog);
                assert.equal(browserLog.length, 0, 'В логе браузера существуют сообщения об ошибках');
            });
    });
})