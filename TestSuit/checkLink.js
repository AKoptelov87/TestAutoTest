/**
 * Created by Ursa on 18.12.2016.
 */

var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    by = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    path = require('path'),
    assert = require('assert');


test.describe('Task 14. Make sure that the links open in a new window', function () {
    var driver,
    //функция нахождения разницы между массивами идентификаторов окон
    getNewWindow = function (oldWindowsID) {
        var winIDs = [];
        driver.getAllWindowHandles().then(function (newWindowsID) {
            newWindowsID.forEach(function (winID) {
                if (oldWindowsID.indexOf(winID) === -1) {
                    winIDs.push(winID)
                }
            });
        });
        return winIDs;
    };

    test.before(function () {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
    });
    test.after(function () {
        driver.sleep('2000');  //Что бы успеть заметить конечное состояние
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

    test.it('открыть пункт меню Countries', function () {
        driver.findElement(by.xpath('.//li[@id="app-"]/a/span[contains(text(),"Countries")]')).click();
        driver.findElement(by.xpath('//td[@id="content"]/h1[contains(text(),"Countries")]'));
    });

    test.it('начать создание новой страны', function () {
        driver.findElement(by.xpath('//td[@id="content"]//a[contains(text(),"Add New Country")]')).click();
        driver.findElement(by.xpath('//td[@id="content"]/h1[contains(text(),"Add New Country")]'));
    });

    test.it('возле некоторых полей есть ссылки с иконкой в виде квадратика со стрелкой -- они ведут на внешние страницы и открываются в новом окне, именно это и нужно проверить.', function () {
        var mainWindowID = driver.getWindowHandle();
        driver.findElements(by.css('td#content i.fa-external-link'))
            .then(function (links) {
                // пробегаем по всем ссылкам
                links.forEach(function (link) {
                    driver.getAllWindowHandles()
                        .then(function (windows) {
                            //кликаем
                            link.click();
                            //ждем
                            driver.wait(function () { return driver.getAllWindowHandles()
                                .then(function (newWindows) {  //вернет t/f для вейта
                                        console.log(windows.length +' : '+newWindows.length);
                                        return windows.length < newWindows.length;
                                    })
                            }, 1000);
                            //находим новое окно
                            return driver.getAllWindowHandles().then(function (newWindows) { return getNewWindow(windows, newWindows)} );
                        })
                        .then(function (newWindowID) {
                            //переключаемся на новое окно и закрываем его
                            console.log(newWindowID[0]);
                            driver.switchTo().window(newWindowID[0]);
                            driver.close();
                            driver.switchTo().window(mainWindowID);
                        })
                })
            })
    });
});

