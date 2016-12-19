/**
 * Created by Ursa on 20.12.2016.
 */
var Product = function() {
    this.addToCart = function () {
        driver.findElement(by.css('span.quantity')).getText().then(function(count){
            //Добовляем в корзину
            driver.findElement(by.name('add_cart_product')).click();
            // Ожидаем пока увеличится счетчик товара
            count = String(Number(count) + 1);
            driver.wait(until.elementTextIs(driver.findElement(by.css('span.quantity')), count));
        });
    };

    this.backToMainPage = function () {
        driver.findElement(by.css('img[title="My Store"]')).click();
    };
};
module.exports = Product;