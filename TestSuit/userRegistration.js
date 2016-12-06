/**
 * Created by Anton.Koptelov on 06.12.2016.
 */
var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    by = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    assert = require('assert');

test.describe('Task 11. Make the scenario of registration of the user', function () {
    var driver,
        something = (Math.random().toString(36).substring(7) + "@superMail.ru"), // элегантное решение +) берем число и переводим в 36 разрядное, потом убираем первые 7 символов, ну чтоб покороче
        newUser = {
            taxId: '1234567890',
            company: 'Selen',
            firstName: 'Anton',
            lastName: 'Koptelov',
            address1: 'г. Самара ул. Ленина',
            address2: 'allWorld',
            postCode: '443100',
            city: 'Samara',
            country: 'Albania',
            // country: 'Russian Federation',
            email: something,
            // + "@superMail.ru",
            phone: '+7987100500',
            password: 'password',
            subscribe: false
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

    test.it('Открыть главную страницу', function () {
        driver.get('http://localhost/litecart/');
        driver.findElement(by.css('div#logotype-wrapper'));
    });

    test.it('Открыть страницу регистрации', function () {
        driver.findElement(by.css('form[name="login_form"] a')).click();
        driver.findElement(by.css('button[name="create_account"]'));
    });

    test.it('Заполнить поля данными', function () {
        var form = driver.findElement(by.name('customer_form')),
            createButton = driver.findElement(by.css('button[name="create_account"]'));

        console.log('Регистрируем любителя уточек: ');
        console.log(newUser);
        Promise.all([
            form.findElement(by.name('tax_id')).sendKeys(newUser.taxId),
            form.findElement(by.name('company')).sendKeys(newUser.company),
            form.findElement(by.name('firstname')).sendKeys(newUser.firstName),
            form.findElement(by.name('lastname')).sendKeys(newUser.lastName),
            form.findElement(by.name('address1')).sendKeys(newUser.address1),
            form.findElement(by.name('address2')).sendKeys(newUser.address2),
            form.findElement(by.name('postcode')).sendKeys(newUser.postCode),
            form.findElement(by.name('city')).sendKeys(newUser.city),
            form.findElement(by.name('country_code')).findElement(by.xpath('option[contains(text(),"' + newUser.country + '")]')).click(),
            form.findElement(by.name('email')).sendKeys(newUser.email),
            form.findElement(by.name('phone')).sendKeys(newUser.phone),
            form.findElement(by.name('password')).sendKeys(newUser.password),
            form.findElement(by.name('confirmed_password')).sendKeys(newUser.password),
            form.findElement(by.name('newsletter')).isSelected().then(function (value) {
                if (value != newUser.subscribe) { el_subscribe.click() }
            })
        ]).then(function () {
            driver.sleep('5000'); //для отладки
            createButton.click();
            driver.findElement(by.css('div#notices div[class="notice success"]'));
            console.log('Пользователь успешно создан')
        })
    });

    test.it('Выйти из пользователя', function () {
        driver.findElement(by.xpath('//div[@id="box-account"]//a[contains(text(),"Logout")]')).click();
        driver.findElement(by.css('div#notices div[class="notice success"]'))
    });
    test.it('Повторный вход для проверки', function (done) {
        var loginPanel = driver.findElement(by.name('login_form'));
        loginPanel.findElement(by.name('email')).sendKeys(newUser.email);
        loginPanel.findElement(by.name('password')).sendKeys(newUser.password);
        loginPanel.findElement(by.name('login')).click();
        driver.findElement(by.css('div#notices div[class="notice success"]')).getText()
            .then(function (greeting) {
                return greeting.search(newUser.firstName + ' ' + newUser.lastName) != -1 ? done() : done("Пользователя назвали другим именем");
            });
    });
})