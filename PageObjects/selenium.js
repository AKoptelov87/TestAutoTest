/**
 * Created by Ursa on 20.12.2016.
 */
var webdriver = require('selenium-webdriver'),
chrome = require('selenium-webdriver/chrome');

module.exports = {
    run: function(browserName) {
        global.until = webdriver.until;
        global.by = webdriver.By;
        global.driver = new webdriver.Builder()
            .forBrowser(browserName)
            .build();
    },

    stop: function() {
        driver.sleep('2000');  //Что бы успеть заметить конечное состояние
        driver.quit();
    }
}