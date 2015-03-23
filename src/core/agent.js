/**
 * Created by kostasmamalis on 23/03/15.
 */
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
