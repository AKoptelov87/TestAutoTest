/**
 * Created by Ursa on 20.12.2016.
 */
var test = require('selenium-webdriver/testing'),
    selenium = require('../PageObjects/selenium'),
    //подгружаем страницы
    main = require('../PageObjects/main'),
    product = require('../PageObjects/product'),
    basket = require('../PageObjects/basket');

test.describe('Task 13_NEW. Make a script with a basket', function () {
    var productToAdd = [
            'Blue Duck',
            'Green Duck',
            'NewTestProduct'
        ];

    test.before(function () {
        selenium.run('chrome');
    });
    test.after(function () {
        selenium.stop()
    });

    test.it('Открыть главную страницу и Добавить товар в корзину', function () {
        var MainPage = new main,
            ProductPage = new product;

        MainPage.open();
        // Открываем страницу продукта и кликаем Добавить
        productToAdd.forEach(function (product) {
            MainPage.openProduct(product);
            ProductPage.addToCart();
            ProductPage.backToMainPage();
        });
    });

    test.it('Удалить все товары из корзины', function () {
        var MainPage = new main,
            BasketPage = new basket;
        
        BasketPage.openCart();
        BasketPage.deleteAll()
    })
})