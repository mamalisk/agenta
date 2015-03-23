/**
 * Created by kostasmamalis on 23/03/15.
 */

'use strict';

var expect = require("chai").expect,
    Agent = require('../lib/core/agent.js'),
    Tools = require('../lib/core/tools.js'),
    Web = require('../lib/webdriver/tool.js');

describe('Web', function () {
    describe('#constructor', function () {
        it('should create ready web client.', function () {

            var webDriver = {
                click: function (element, callback) {
                    console.log(element.locator);
                    callback();
                },
                call: function (callback) {
                    callback();
                }
            };
            var web = new Web(webDriver);
            expect(web).to.be.a('object');
            expect(web).to.respondTo('clickOn');
            var element = {locator: '.locator', alias: 'test element'};
            web.clickOn(element, function () {
                console.log('I am executed');
            });
        });
    });
});
