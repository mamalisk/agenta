var buildProto = require('../utils/buildProto'),
    realPath   = require('../utils/realPath.js');

var Agent = function(){
    var self = this;
    this.memory = {};
};

Agent.prototype.extendWith = function(locations, base){
    if(!base) base = __dirname;
    buildProto(Agent.prototype,locations.map(realPath(base)));
};

Agent.prototype.withLogger = function(Logger){
    this.Logger = Logger;
    return this;
};

Agent.prototype.narrate =  function(message, level){
    if(this.Logger) {
        if(level) {
            this.Logger.log(level, message);
        }
        else {
            this.Logger.info(message);
        }
    }
    else {
        if(level) {
            console.log('[' + level + '] ' + message);
        }
        else {
            console.log(message);
        }
    }
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