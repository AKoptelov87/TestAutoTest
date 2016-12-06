/**
 * Created by Anton.Koptelov on 06.12.2016.
 */
var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    by = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    assert = require('assert');

test.describe('Task 10. Check that the correct product page opens', function () {
    var driver,
        something = Math.random().toString(36).substring(7), // элегантное решение +) берем число и переводим в 36 разрядное, потом убираем первые 7 символов, ну чтоб покороче
        newUser = {
            taxId: '',
            Company: 'Selen',
            firstName: 'Антон',
            lastName: 'Коптелов',
            address1: 'Самара',
            address2: '',
            postcode: '',
            city: '',
            country: '',
            email: `${chislo}@mail.ru`,
            phone: '',
            password: '',
            Subscribe: true
        };

    console.log(chislo);

    test.before(function () {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
    });
    test.after(() => {
        driver.sleep('2000');  //Что бы успеть заметить конечное состояние
        driver.quit();
    });

    test.it('Открыть главную страницу', function () {
        driver.get('http://localhost/litecart/');
        driver.findElement(by.css('div#logotype-wrapper'));
    });

    test.it('Открыть страницу регистрации', function () {
        driver.findElement(by.css('form[name="login_form"] a')).click();
        driver.findElement(by.css('button[name="create_account"]'));
    });

    test.it('Заполнить поля данными', function () {

    });

    test.it('Открыть главную страницу', function () {
    });
    test.it('Открыть главную страницу', function () {
    });

})