/**
 * Created by kostasmamalis on 23/03/15.
 */

'use strict';

var Agent = require('../../src/core/agent.js'),
    logger = require('winston'),
    webDriver = require('webdriverio').remote({ desiredCapabilities: {browserName: 'chrome'} }),
    Web = require('../../src/webdriver/web.js').Web,
    Screen = require('../../src/webdriver/screen.js'),
    ScreenElement = require('../../src/webdriver/screenElement.js');

describe('RealWeb', function () {

    describe('#constructor', function () {
        it('should create ready web client.', function (done) {
            webDriver.init(function(){});
            var agent = new Agent().withLogger(logger);
            agent.extendWith(['../webdriver/missions']);
            agent.setDriver(webDriver);
            var searchBox = new ScreenElement('searchBox','#lst-ib');
            var googleMain = new Screen('Google',[searchBox]).withUrl('http://www.google.co.uk');
            agent.navigateTo(googleMain.url);
            agent.fillIn(googleMain.searchBox,'test');
            webDriver.end(done);
        });
    })


});


