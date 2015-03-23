// package.json

{
	"name": "agenta.js",
	"version": "0.0.1",
	"description" : "A BDD and DSL-oriented, scalable Acceptance Testing Framework using Yadda & Webdriver.io. Inspired by Mimik...",
	"homepage": "http://agenta.io",
	"author" : "Kostas Mamalis <mamalis.kostas@gmail.com>",
	"contributors" : [],
	"repository" : {
       "type" : "git",
       "url"  : "git://github.com/agenta/agenta.git"
	},
	"main" : "./bin/agenta.js",
	"bugs" : {
       "url" : "https://github.com/agenta/agenta/issues"
	},
	"bin" : {
		"agenta.js" : "./bin/agenta.js"
	},
	"license": [
		{
		"type": "MIT",
		"url": "https://github.com/agenta/agenta/blob/master/LICENSE-MIT"
		}
	],
	"dependencies": {
		"yadda" : "^0.11.4",
		"chai" : "~1.9.0",
		"mocha": "~1.18.2",
		"async" : "*",
		"asyncawait" : "*",
		"gulp" : "*",
		"gulp-yadda-steps" : "*",
		"didyoumean": "~1.2.0",
		"webdriverio" : "^2.3.0",
		"winston": "~0.7.3",
		"commander": "^2.3.0",
		"object-mixin" : "~0.2.1",
		"mixin" : "0.2.0"
		},
	"devDependencies": {},
	"scripts" : {
		"test" : "mocha  --timeout 15000 --reporter spec yadda-webdriverio.js",
		"yadda-debug" : "mocha debug --timeout 15000 --reporter spec spot-test.js",
		"yadda" : "node bin/example.js"
	},
	"engines": {
		"node": ">=0.8.0"
	},
	"tags": [
	    "bdd",
	    "automation",
	    "end to end testing",
	    "gherkin",
	    "webdriver",
	    "cucumber",
		"web",
		"test",
		"selenium",
		"browser",
		"javascript"
	],
	"keywords": [
	    "agenta",
	    "yadda",
		"webdriverio",
		"webdriver",
		"selenium",
		"appium",
		"saucelabs",
		"sauce",
		"labs",
		"mocha",
		"nodeUnit",
		"buster",
		"phantomjs",
		"chai",
		"vows",
		"jasmine",
		"assert",
		"cucumber",
		"testingbot"
	]
}

// agenta-test.js
'use strict';

var expect = require("chai").expect,
    Agent = require('../lib/core/agent.js'),
    Tools = require('../lib/core/tools.js');
              

describe('Agent', function(){
   describe('#constructor', function(){
   	   it('should create an empty agent', function(){
           var agent = new Agent();
           expect(agent).to.be.a('object');
           expect(agent).to.respondTo('remember');
           expect(agent).to.respondTo('recall');
           expect(agent).to.respondTo('narrate');
   	   });
   });
   describe('#remember', function(){
      it('should store data to memory', function(){
           var agent = new Agent();
           agent.remember('test',{ objectAttribute : 'objectValue'});
           expect(agent.recall('test')).to.have.property('objectAttribute');
           expect(agent.recall('test').objectAttribute).to.equal('objectValue');
      });
   });
});

// tools-test.js

'use strict';

var expect = require("chai").expect,
    Agent = require('../lib/core/agent.js'),
    Tools = require('../lib/core/tools.js');


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

// webdriver-test.js

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

// bin agenta.js

#!/usr/bin/env node
/* global require,console,process */

var program = require('commander'),
    pkg = require('../package.json')
;


var stdin = process.stdin,
stdout = process.stdout,
prompt = '\u203A',
runner;
program
.version(pkg.version)
.description(pkg.description);

function printAgentaLogo() {
	console.log(["",
"                         _         ",
"   __ _  __ _  ___ _ __ | |_ __ _  ",
"  / _` |/ _` |/ _ \\ '_ \\| __/ _` | ",
"   (_| | (_| |  __/ | | | || (_| | ",
"  \\__,_|\\__, |\\___|_| |_|\\__\\__,_| ",
"        |___/                      ",
	].join('\n'));
}

program.parse(process.argv);

printAgentaLogo();

// lib/core/agent.js

'use strict';

var Agent = function(){
	var self = this;
	this.memory = {};
};

Agent.prototype.narrate =  function(message){
    	console.log(message);
};


Agent.prototype.remember = function(key, object) {
      this.memory[key] = object;
}

Agent.prototype.recall = function(key) {
	if(key in this.memory) {
		console.log('found key: ' + key);
		return this.memory[key];
	} else {
		throw Error('unknown key ' + key);
	}
}

module.exports = Agent;

// tools.js

'use strict';
var Agent = require('./agent.js');

var Tools = function() {};

Tools.prototype.equip = function(agent){
	for (var i = 1, l = arguments.length; i < l; i += 1) {
		if ('object' === typeof arguments[i])
			agent = mixin(agent, arguments[i]);
	}
	return agent;
};

function mixin(a, b) {
	var keys = Object.keys(b);
	var key;
	for (var i = 0, l = keys.length; i < l; i += 1) {
		key = keys[i];
	if ('object' === typeof a[key])
		a[key] = mixin(a[key], b[key]);
	else
		a[key] = b[key];
	}
 	return a;
}

module.exports = new Tools();


