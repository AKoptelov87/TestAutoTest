/**
 * Created by Ursa on 04.12.2016.
 */
var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    by = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    assert = require('assert');

test.describe('Task 7. Open all section of admin menu', function () {
    var driver, numbersCountryWhithZones = [], error = [];

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

    test.it('Открываем страницу со странами', function () {
        // driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');
        driver.findElement(by.xpath('.//li[@id="app-"]/a/span[contains(text(),"Countries")]')).click();
        driver.findElement(by.xpath('//td[@id="content"]/h1[contains(text(),"Countries")]'));
    });

    test.xit('Проверяем сортировку списка стран', function () {
        chechTableSorting(driver.findElements(by.css('tr.row > td:nth-child(5) > a')));
    });
    test.xit('Читаем все страны и сравниваем с сортированным списком', function () {

        driver.findElements(by.css('tr.row > td:nth-child(5) > a'))
            .then(function (allCountry) {
                var countryNames = [];
                console.log("Стран в списке: " + ( allCountry.length + 1));
                allCountry.forEach(function (country) {
                    country.getText()
                        .then(function (countryName) {
                            countryNames.push(countryName);
                            // countryNames.push('zz');
                        })
                });
                return countryNames
            })
            .then(function (countryNames) {
                var sortedCountryNames = countryNames.slice().sort();
                assert.deepEqual(countryNames, sortedCountryNames, 'Порядок нарушен!');
                // for (i = 1; i < countryNames.length; i++) {
                //     console.log(sortedCountryNames[i] +'  ===  '+ countryNames[i]);
                //     assert((sortedCountryNames[i] !== countryNames[i]), 'Порядок нарушен!');
                //     if (sortedCountryNames[i] !== countryNames[i]) {
                //         console.log('Порядок нарушен!')
                //     }
                // }
            })
    });

    test.it('Находим страны с зонами', function () {
        driver.findElements(by.css('tr.row > td:nth-child(6)'))
            .then(function (geoCounts) {
                var countryNumber = 1;
                geoCounts.forEach(function (geoCount) {
                    geoCount.getText()
                        .then(function (count) {
                            countryNumber++;
                            // console.log( 'нашли зон:' + count);
                            if (count != 0) {
                                console.log('В стране №' + countryNumber + ' нойдено ' + count + ' зон');
                                numbersCountryWhithZones.push(countryNumber)
                            }
                        });

                });
                return numbersCountryWhithZones;
            })
            .then(function (countryNumbers) {
                console.log(countryNumbers);
                countryNumbers.forEach(function (countryNumber) {
                    driver.findElement(by.css('table.dataTable tr.row:nth-child(' + countryNumber + ') a')).click();
                    if (
                        chechTableSorting(driver.findElements(by.xpath('.//table[@id="table-zones"]/tbody/tr/td[3][input[@type="hidden"]]')))
                    ) {
                        error.push("errr");
                    }
                    driver.findElement(by.name('cancel')).click();
                })

            })

    });

    test.it('Проверяем наличие ошибок ', function () {
        console.log(error);
        assert.equal(error.length, 0);
    })
});

function chechTableSorting(table) {
    table
        .then(function (inputArray) {
            var sourceList = [];
            console.log("В списке: " + ( inputArray.length + 1));
            inputArray.forEach(function (target) {
                target.getText()
                    .then(function (targetText) {
                        sourceList.push(targetText);
                        sourceList.push('zz');
                    })
            });
            return sourceList;
        })
        .then(function (sourceList) {
            var targetList = sourceList.slice().sort();
            // assert.deepEqual(sourceList, targetList, 'Порядок нарушен!');
            for (i = 0; i < sourceList.length; i++) {
                console.log(sourceList[i] + '  ===  ' + targetList[i]);
                if (targetList[i] !== sourceList[i]) {
                    message = 'Порядок нарушен! Расхождение с элемента №' + (i+1);
                    console.log(message);
                    return message;
                    // break;
                }
            }
        })
}