module.exports = function fillIn(element, value, callback){
    this.Logger.info('filling in ' + element.locator + ' with ' + value);
    this.webDriver.setValue(element.locator, value);
    if(callback){
        callback();
    }
};