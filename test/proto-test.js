var Agent = require('../src/core/agent.js'),
    Tools = require('../src/core/tools.js'),
    ScreenElement = require('../src/webdriver/screenElement.js'),
    winston = require('winston');

describe('Agent with Proto',function(){
    describe('buildProto',function(){
        before('start',function(){
            new Agent().extendWith(['../webdriver/missions']);
        });

        it('should allow me to use clickAndWait', function(done){
            var webDriver = {
                click: function (element, callback) {
                    console.log(element.locator);
                    if(callback) callback();

                },
                call: function (callback) {
                    if(callback) callback();

                },
                setValue : function(element, value, callback){
                    return this;
                },
                url : function(url, callback){
                    return this;
                }
            };
            var agent = new Agent();
            agent.withLogger(winston);
            agent.setDriver(webDriver);
            var myElement = new ScreenElement('my element', '.locator');
            agent.navigateTo('http://www.google.co.uk');
            agent.clickOn(myElement);
            agent.fillIn(myElement,'test',done);
        });

    });
});