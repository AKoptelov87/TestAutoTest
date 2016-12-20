/**
 * Created by Ursa on 04.12.2016.
 */
var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    by = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    assert = require('assert');

test.describe('Task 9. Check sorts of countries and geo zones in the admin panel', function () {
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

    test.it('Открываем раздел меню Countries', function () {
        // driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');
        driver.findElement(by.xpath('.//li[@id="app-"]/a/span[contains(text(),"Countries")]')).click();
        driver.findElement(by.xpath('//td[@id="content"]/h1[contains(text(),"Countries")]'));
    });

    test.it('Проверяем сортировку списка стран', function () {
        console.log('Проверяем сортировку списка стран');
        driver.findElements(by.css('tr.row > td:nth-child(5) > a'))
            .then(function (allCountries) {
                var sourceList = [];
                console.log("В списке: " + ( allCountries.length ));
                allCountries.forEach(function (country) {
                    country.getText()
                        .then(function (countryName) {
                            sourceList.push(countryName);
                            // sourceList.push('zz');  // для проверки
                        })
                });
                return sourceList;
            })
            .then(function (sourceList) {
                var targetList = sourceList.slice().sort();
                assert.deepEqual(sourceList, targetList, 'Порядок сортировки нарушен!');
                console.log('Все зоны в алфавитном порядке \n\n');
            })
    });

    test.it('Находим страны с зонами', function () {
        var error = [];
        driver.findElements(by.css('tr.row > td:nth-child(6)'))
            .then(function (geoCounts) {
                var countryNumber = 1,  //грязный хук
                    namesCountryWhithZones = [];
                geoCounts.forEach(function (geoCount) {
                    geoCount.getText()
                        .then(function (count) {
                            countryNumber++;
                            if (count != 0) {
                                driver.findElement(by.css('table.dataTable tr.row:nth-child(' + countryNumber + ') a')).getText()
                                    .then(function (countryName) {
                                        console.log('В стране ' + countryName + ' нойдено ' + count + ' зон');
                                        namesCountryWhithZones.push(countryName)
                                    })
                            }
                        });
                });
                return namesCountryWhithZones;
            })
            .then(function (countryNames) {
                // console.log(countryNames);
                countryNames.forEach(function (countryName) {
                    driver.findElement(by.xpath('.//td/a[contains(text(), "' + countryName + '")]')).click();
                    driver.findElements(by.xpath('.//table[@id="table-zones"]/tbody/tr/td[3][input[@type="hidden"]]'))
                        .then(function (allZones) {
                            var sourceList = [];
                            console.log('Проверяем страну: ' + countryName);
                            console.log("В списке: " + ( allZones.length ));
                            allZones.forEach(function (zone) {
                                zone.getText()
                                    .then(function (zoneName) {
                                        sourceList.push(zoneName);
                                        // sourceList.push('zz');  // для отладки
                                    })
                            });
                            return sourceList;
                        })
                        .then(function (sourceList) {
                            var targetList = sourceList.slice().sort();
                            for (i = 0; i < sourceList.length; i++) {
                                console.log(sourceList[i] + '  ===  ' + targetList[i]);
                                if (targetList[i] !== sourceList[i]) {
                                    result = 'Порядок нарушен! Расхождение с элемента №' + (i + 1);
                                    console.log(result);
                                    error.push('Ошибка при проверке страны ' + countryName + ' ' + result);
                                    break;
                                }
                            }
                        })
                        .then(function () {
                            driver.findElement(by.name('cancel')).click();
                        })
                });
                return error;
            })
            .then(function (error) {
                if (error.length > 0) {
                    console.log(error);
                    assert.fail(error.length, 0, 'Присутсвуют ошибки в сортировке', '>');
                } else {
                    console.log('Все зоны в алфавитном порядке \n\n');
                }
            })

    });

    test.it('Открываем раздел меню Geo Zones и запоминаем зоны', function () {
        // driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');
        driver.findElement(by.xpath('.//li[@id="app-"]/a/span[contains(text(),"Geo Zones")]')).click();
        driver.findElement(by.xpath('//td[@id="content"]/h1[contains(text(),"Geo Zones")]'));
    });

    test.it('Заходим в каждую зону и проверяем порядок', function () {
        var error = [],
            zoneNames = [];

        driver.findElements(by.css('table.dataTable tr.row > td:nth-child(3) > a'))
            .then(function (geoZones) {
                geoZones.forEach(function (zone) {
                    zone.getText()
                        .then(function (zoneName) {
                            zoneNames.push(zoneName);
                        })
                });
                return zoneNames;
            })
            .then(function (zoneNames) {
                zoneNames.forEach(function (zone) {
                    driver.findElement(by.xpath('.//table[@class="dataTable"]//a[contains(text(),"' + zone + '")]')).click();
                    driver.findElements(by.css('table#table-zones tr > td:nth-child(3) option[selected="selected"]'))
                        .then(function (allZones) {
                            var sourceList = [];
                            console.log('Проверяем гео зону: ' + zone);
                            console.log("В списке: " + ( allZones.length ));
                            allZones.forEach(function (zone) {
                                zone.getText()
                                    .then(function (zoneName) {
                                        sourceList.push(zoneName);
                                        // sourceList.push('zz'); // для отладки
                                    })
                            });
                            return sourceList;
                        })
                        .then(function (sourceList) {
                            var targetList = sourceList.slice().sort();
                            for (i = 0; i < sourceList.length; i++) {
                                console.log(sourceList[i] + '  ===  ' + targetList[i]);
                                if (targetList[i] !== sourceList[i]) {
                                    result = 'Порядок нарушен! Расхождение с элемента №' + (i + 1);
                                    console.log(result);
                                    error.push('Ошибка при проверке зоны ' + zone + ' ' + result);
                                    break;
                                }
                            }
                        })
                        .then(function () {
                            driver.findElement(by.name('cancel')).click();
                        })
                });
                return error;
            })
            .then(function (error) {
                if (error.length > 0) {
                    console.log(error);
                    assert.fail(error.length, 0, 'Присутсвуют ошибки в сортировке', '>');
                } else {
                    console.log('Все зоны в алфавитном порядке');
                }
            })
    })
});