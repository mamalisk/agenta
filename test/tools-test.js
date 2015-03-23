/**
 * Created by kostasmamalis on 23/03/15.
 */
'use strict';

var expect = require("chai").expect,
    Agent = require('../src/core/agent.js'),
    Tools = require('../src/core/tools.js');


describe('Tools', function () {
    describe('#equip', function () {
        it('should equip an agent with a set of tools', function(){
            var agent = Tools.equip(new Agent(),{
                mixme : function() { return 'mixing'; }
            });
            expect(agent).to.be.a('object');
            expect(agent).to.have.property('mixme');
            agent.mixme();
            expect(agent.mixme()).to.be.equal('mixing');
        });

        it('should equip an agent with webClient', function () {
            var myWebDriver = {
                name: 'webdriver'
            };

            var agent = Tools.equip(new Agent(), {
                webDriver: myWebDriver,
                clickOn: function (element, callback) {
                    console.log(element.locator);
                    console.log(this.webDriver.name);
                    callback();
                }
            });
            var element = {locator: '.locator', alias: 'test element'};
            agent.clickOn(element, function () {
                console.log('I am executed');
            });
            expect(agent).to.be.a('object');
            expect(agent).to.respondTo('clickOn');
        });
    });
});
