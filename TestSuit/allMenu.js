/**
 * Created by Anton.Koptelov on 01.12.2016.
 */

var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    by = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    assert = require('assert');

test.describe('Task 7. Open all section of admin menu', function () {
    var driver, countOfMenu, error = [];

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

    test.it('считаем кол-во менюшек', function () {
        driver.findElements(by.css('ul#box-apps-menu > li#app-'))
            .then(function (allMenuCategories) {
                countOfMenu = allMenuCategories.length;
                console.log("нашли категорий меню: " + countOfMenu);
            })
    });

    test.it('прощелкиваем все меню и сравниваем с названием формы', function () {
        for (i = 1; i <= countOfMenu; i++) {
            driver.findElement(by.xpath('//ul[@id="box-apps-menu"]/li[' + i + ']')).click();
            driver.findElements(by.css('ul#box-apps-menu > li#app- > ul span'))
                .then(function (allSubCategories) {
                    countSubCategories = allSubCategories.length;
                    console.log("нашли подкатегорий " + countSubCategories);
                    if (countSubCategories == 0) {
                        driver.findElement(by.css('li.selected#app-')).getText()
                            .then(function (CetegoriesName) {
                                driver.findElement(by.css('td#content > h1')).getText()
                                    .then(function (categoryNameInForm) {
                                        console.log(CetegoriesName + "   :   " + categoryNameInForm);
                                        if (CetegoriesName !== categoryNameInForm) {
                                            console.log(' Error: Название пункта меню и формы не совпадают!');
                                            error.push('Название пункта меню ' + CetegoriesName + ' и название формы ' + categoryNameInForm + ' не совпадают!')
                                        }
                                    })
                            })
                    }
                    return countSubCategories;
                })
                .then(function (countSubCategories) {
                    for (var i = 1; i <= countSubCategories; i++) {
                        driver.findElement(by.xpath('//ul[@id="box-apps-menu"]/li/ul/li[' + i + ']')).click();
                        driver.findElement(by.xpath('//ul[@id="box-apps-menu"]/li/ul/li[' + i + ']')).getText()
                            .then(function (subCetegoriesName) {
                                driver.findElement(by.css('td#content > h1')).getText()
                                    .then(function (categoryNameInForm) {
                                        console.log(subCetegoriesName + "   :   " + categoryNameInForm);
                                        if (subCetegoriesName !== categoryNameInForm) {
                                            console.log('Error: Название пункта меню и формы не совпадают!');
                                            error.push('Название пункта меню ' + subCetegoriesName + ' и название формы ' + categoryNameInForm + ' не совпадают!')
                                        }
                                    })
                            })
                    }

                })
        }

    });

    test.it('Проверяем наличие ошибок ', function () {
        console.log(error);
        assert.equal(error.length, 0);

    })
});