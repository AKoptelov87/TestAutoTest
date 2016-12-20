/**
 * Created by Ursa on 20.12.2016.
 */
var Main = function() {

    this.open = function () {
        driver.get('http://localhost/litecart/');
        driver.findElement(by.css('div#logotype-wrapper'));
    };

    this.getCartCount = function () {
        return driver.findElement(by.css('span.quantity')).getText().then(function (count) {
            console.log("в корзине сейчас " + count + " продуктов");
            return count;
        })
    };

    this.openProduct = function(productName) {
        driver.findElement(by.xpath('//a[@title="' + productName + '"]')).click();
    };

};
module.exports = Main;