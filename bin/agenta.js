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