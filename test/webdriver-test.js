/**
 * Created by kostasmamalis on 23/03/15.
 */

'use strict';

var expect = require("chai").expect,
    Agent = require('../src/core/agent.js'),
    Tools = require('../src/core/tools.js'),
    webDriver = {
        click: function (element, callback) {
            console.log(element.locator);
            callback();
        },
        call: function (callback) {
            callback();
        }
    },
    Web = require('../src/webdriver/web.js').Web.withDriver(webDriver);

describe('Web', function () {
    describe('#constructor', function () {
        it('should create ready web client.', function () {

            expect(Web).to.be.a('object');
            expect(Web).to.respondTo('clickOn');
            var element = {locator: '.locator', alias: 'test element'};
            var agent = Tools.equip(new Agent(), Web);
            agent.clickOn(element, function () {
                console.log('I am executed');
            });
        });
    });
});
