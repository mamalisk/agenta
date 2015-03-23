'use strict';

var expect = require("chai").expect,
    Agent = require('../src/core/agent.js'),
    Tools = require('../src/core/tools.js'),
    winston = require('winston'),
    Logger = winston.Logger
    ;


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

    describe('#withLogger', function() {
        it('should log messages to console when not defined', function() {
            var agent = new Agent();
            agent.narrate('narrate to console');
            agent.narrate('narrate to console','error');
        });
        it('should log messages using winston when defined', function(){
            var agent = new Agent().withLogger(winston);
            agent.narrate('narrate to winston');
            agent.narrate('narrate to winston','error');
        });
    });
});