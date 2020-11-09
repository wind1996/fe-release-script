const readline = require('readline');
const chalk = require('chalk');

const startServerCommand = require("../tasks/startServer")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question(chalk.redBright.bold('确认开启服务？（y/n）'), (confirm) => {
    if (confirm !== 'y') {
        rl.close();
        return;
    }
    startServerCommand(() => {
        rl.close();
    });
})

// close事件监听
rl.on('close', () => {
    process.exit(0);
});
