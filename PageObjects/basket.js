/**
 * Created by Ursa on 20.12.2016.
 */
var Basket = function() {
    this.openCart = function () {
        driver.findElement(by.css('#cart a.link')).click();
    };

    this.deleteAll = function () {
        driver.findElements(by.css('table.dataTable td.item'))
            .then(function (itemsInCart) {
                startCount = itemsInCart.length;
                // console.log('Сейчас в корзине ' + startCount);
                itemsInCart.forEach(function (item) {
                    driver.findElement(by.name('remove_cart_item')).click();
                    driver.wait(until.stalenessOf(item), 10000);
                })
            })
    };
};
module.exports = Basket;