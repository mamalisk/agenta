'use strict';

var Web = function (webDriver) {
    this.webDriver = webDriver;
}

module.exports.Web = {

    withDriver: function (webDriver) {
        this.webDriver = webDriver;
        return this;
    },

    clickOn: function (element, callback) {
        this.webDriver.click(element.locator, function (err, res) {
            if (err) {
                console.log('error!');
                throw new Error('unable to click on' + element.alias);
            }

        });
        callback();
    }
}