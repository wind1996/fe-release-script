#!/usr/bin/env node
const arg = process.argv.splice(2)
if (arg.length === 1 && arg[0] === "config") {
    require('../lib/cmdEntrance/generztorConfigFile');
} else if (arg.length === 1 && arg[0] === "start") {
    require('../lib/cmdEntrance/startServerCommand');
} else if (arg.length === 1 && arg[0] === "init") {
    require('../lib/cmdEntrance/initCommand');
} else {
    require('../lib/cmdEntrance');
}
