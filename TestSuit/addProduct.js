/**
 * Created by Ursa on 10.12.2016.
 */
var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    by = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    path = require('path'),
    assert = require('assert');

test.describe('Task 12. Make a script add an item', function () {
    var driver,
        productToAdd = {
            General: {
                status: 'Enabled',
                name: 'NewTestProduct',
                code: '',
                categories: 'Subcategory',
                gender: 'Male',
                quantity: '10.00',
                quantityUnit: 'pcs',
                deliveryStatus: '3-5',
                soldOutStatus: '',
                images: 'duck_img.png',
                dateValidFrom: '01.01.2016',
                dateValidTo: '31.12.2016'
            },
            Information: {
                manufacturer: '',
                supplier: '',
                keywords: '',
                shortDescription: '',
                description: '',
                headTitle: '',
                metaDescription: ''
            },
            Prices: {}
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

    test.it('открыть меню Catalog', function () {
        driver.findElement(by.xpath('.//li[@id="app-"]/a/span[contains(text(),"Catalog")]')).click();
        driver.findElement(by.xpath('//td[@id="content"]/h1[contains(text(),"Catalog")]'));
    });

    test.it('Нажать кнопку добавить продукт', function () {
        driver.findElement(by.xpath('//td[@id="content"]//a[contains(text(),"Add New Product")]')).click()

    });

    test.it('Заполняем вкладку General', function () {
        driver.findElement(by.css('div.tabs a[href="#tab-general"]')).click();
        var workspace = driver.findElement(by.css('div#tab-general')),
            status = workspace.findElement(by.xpath('//td[strong[contains(text(),"Status")]]')),
            categories = workspace.findElement(by.xpath('//td[strong[contains(text(),"Categories")]]/div')),
            gender = workspace.findElement(by.xpath('//div[@class="input-wrapper"][.//strong[contains(text(),"Gender")]]')),
            quantity = workspace.findElement(by.name('quantity')),
            dateFrom = workspace.findElement(by.name('date_valid_from')),
            dateTo = workspace.findElement(by.name('date_valid_to'));

        //заполняем статус
        switch (productToAdd.General.status) {
            case 'Enabled':
                status.findElement(by.css('input[name="status"][value="1"]')).click();
                break;
            case 'Disabled':
                status.findElement(by.css('input[name="status"][value="0"]')).click();
                break;
            default:
                console.log('\n status set default');
        }

        //заполняем название
        workspace.findElement(by.name('name[en]')).sendKeys(productToAdd.General.name);

        //заполняем код
        workspace.findElement(by.name('code')).sendKeys(productToAdd.General.code);

        // отмечаем галочкой категорию
        if (productToAdd.General.categories != '') {
            categories.findElement(by.css('input[data-name="' + productToAdd.General.categories + '"]')).click();
        }else {console.log('\n categories set default');}

        // отмечаем половую принадлежность
        switch (productToAdd.General.gender) {
            case 'Male':
                gender.findElement(by.css('input[value="1-1"]')).click();
                break;
            case 'Female':
                gender.findElement(by.css('input[value="1-2"]')).click();
                break;
            case 'Unisex':
                gender.findElement(by.css('input[value="1-3"]')).click();
                break;
            default:
                console.log('\ngender set default');
        }

        // заполняем количество
        if (productToAdd.General.quantity != '') {
            quantity.clear();
            quantity.sendKeys(productToAdd.General.quantity);
        } else { console.log('\n quantity set default') }
        // выбираем единицу исчисления
        if (productToAdd.General.quantityUnit != '') {
            workspace.findElement(by.xpath('//select[@name="quantity_unit_id"]//option[contains(text(),"' + productToAdd.General.quantityUnit + '")]')).click();
        } else {console.log('\n quantity unit set default')}
        // выбираем время доставки
        if (productToAdd.General.deliveryStatus != '') {
            workspace.findElement(by.xpath('//select[@name="delivery_status_id"]//option[contains(text(),"' + productToAdd.General.deliveryStatus + '")]')).click();
        } else {console.log('\n deliverys tatus set default')}
        // выбираем статус продаж
        if (productToAdd.General.soldOutStatus != '') {
            workspace.findElement(by.xpath('//select[@name="sold_out_status_id"]//option[contains(text(),"' + productToAdd.General.soldOutStatus + '")]')).click();
        } else {console.log('\n sold out status set default');}

        // добавляем фоточку
        if (productToAdd.General.images != '') {
            workspace.findElement(by.name('new_images[]')).sendKeys(path.resolve(productToAdd.General.images));
        } else {console.log('\n images set default');}

        // заполняем действует c
        if (productToAdd.General.dateValidFrom != '') {
            // dateFrom.clear();
            dateFrom.sendKeys(productToAdd.General.dateValidFrom);
        } else { console.log('\n date valid from set default') }
        // заполняем действует до
        if (productToAdd.General.dateValidTo != '') {
            // dateTo.clear();
            dateTo.sendKeys(productToAdd.General.dateValidTo);
        } else { console.log('\n date valid to set default') }
    });

    test.it('Заполняем вкладку Information', function () {
        driver.findElement(by.css('div.tabs a[href="#tab-information"]')).click();
        var workspace = driver.findElement(by.css('div#tab-information'));

        
    })

})