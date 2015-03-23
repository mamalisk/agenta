/**
 * Created by kostasmamalis on 23/03/15.
 */
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
