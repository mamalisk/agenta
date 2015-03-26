'use strict';

var expect = require("chai").expect,
    Screen = require('../src/webdriver/screen.js'),
    ScreenElement = require('../src/webdriver/screenElement.js');

describe("Screen", function () {
    describe('#constructor without elements', function () {
        it('should create an empty screen', function(){
            var myScreen = new Screen('my screen');
            expect(myScreen.name).to.be.equal('my screen');
            expect(myScreen.url).to.be.equal('/');
        });
    });

    describe('#constructor with elements', function () {
        it('should instantiate with elements', function(){
            var screenElementOne = new ScreenElement('myElement1', '#personal_id_1');
            var screenElementTwo = new ScreenElement('myElement2', '#personal_id_2');
            var myScreen = new Screen('my screen', [screenElementOne, screenElementTwo]);
            expect(myScreen.name).to.be.equal('my screen');
            expect(myScreen.myElement1.locator).to.be.equal('#personal_id_1');
            expect(myScreen.myElement2.locator).to.be.equal('#personal_id_2');

        })
    });

    describe('#constructor with subScreens', function() {
        it('should instantiate with subscreens and then easily refer to elements', function(){
            var topMenu = new Screen("topMenu", [new ScreenElement('mainMenu','.mainMenu')]);
            var footer = new Screen('footer', [new ScreenElement('addresses', '.contactUs'), new ScreenElement('copyright','.copy')]);
            var mainScreen = new Screen("main Screen",[],[topMenu, footer]);
            expect(mainScreen.topMenu).to.not.be.empty;
            expect(mainScreen.topMenu.mainMenu.locator).to.be.equal('.mainMenu');
            expect(mainScreen.footer.copyright.locator).to.be.equal('.copy');
        })
    });

    describe('#withUrl', function () {
        it('should set the url',function(){
            var myScreen = new Screen('my screen');
            expect(myScreen.url).to.be.equal('/');
            myScreen = myScreen.withUrl('http://www.google.co.uk');
            expect(myScreen.url).to.be.equal('http://www.google.co.uk');
        })
    });

    describe('#withScreenElement', function() {
        it('should set/reset an element', function(){
            var screenElementOne = new ScreenElement('myElement1', '#personal_id_1');
            var screenElementTwo = new ScreenElement('myElement2', '#personal_id_2');
            var myScreen = new Screen('my screen', [screenElementOne, screenElementTwo]);
            expect(myScreen.name).to.be.equal('my screen');
            expect(myScreen['myElement1'].locator).to.be.equal('#personal_id_1');
            expect(myScreen.myElement2.locator).to.be.equal('#personal_id_2');
            myScreen = myScreen.withScreenElement(new ScreenElement('myElement1', '#personal_new_id_1')).withScreenElement(new ScreenElement('myElement3', '#personal_id_3'));
            expect(myScreen.myElement1.locator).to.be.equal('#personal_new_id_1');
            expect(myScreen.myElement2.locator).to.be.equal('#personal_id_2');
            expect(myScreen.myElement3.locator).to.be.equal('#personal_id_3');
        });
    });

    describe('#withSubScreen', function() {
        it('should add a subscreens and then easily refer to elements', function(){
            var topMenu = new Screen("topMenu", [new ScreenElement('mainMenu','.mainMenu')]);
            var footer = new Screen('footer', [new ScreenElement('addresses', '.contactUs'), new ScreenElement('copyright','.copy')]);
            var mainScreen = new Screen("main Screen").withSubScreen(topMenu).withSubScreen(footer);
            expect(mainScreen.topMenu).to.not.be.empty;
            expect(mainScreen.topMenu.mainMenu.locator).to.be.equal('.mainMenu');
            expect(mainScreen.footer.copyright.locator).to.be.equal('.copy');
        })
    });
});