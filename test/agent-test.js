'use strict';

var expect = require("chai").expect,
    Agent = require('../src/core/agent.js'),
    Tools = require('../src/core/tools.js');


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