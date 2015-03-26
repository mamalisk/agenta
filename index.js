/**
 * Created by kostasmamalis on 26/03/15.
 */

var Agent = require('./src/core/agent.js'),
    Screen = require('./src/webdriver/screen.js'),
    ScreenElement = require('./src/webdriver/screenElement.js'),
    package = require('./package.json');

module.exports.version = package.version;
module.exports.Agent = Agent;
module.exports.Screen = Screen;
module.exports.ScreenElement = ScreenElement;