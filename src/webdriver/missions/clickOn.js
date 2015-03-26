module.exports = function clickOn(element, callback) {
    var webdriver = this.webDriver;
    var self = this;

    webdriver.click(element.locator, function (err, res) {
        self.Logger.info('Clicking on ' + element.locator);
        if (err) {
            self.Logger.error('error!');
            throw new Error('unable to click on' + element.alias);
        }
    });
    if(callback) {
        callback();
    }

};