module.exports = function navigateTo(url, callback){
    this.Logger.info('Navigating to ' + url);
    this.webDriver.url(url);
    if(callback){
        callback();
    };
};