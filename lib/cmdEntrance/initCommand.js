const readline = require('readline');
const chalk = require('chalk');

const initCommand = require("../tasks/initServerEnv")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question(chalk.redBright.bold('确认初始化服务器部署目录？（y/n）'), (confirm) => {
    if (confirm !== 'y') {
        rl.close();
        return;
    }
    initCommand(() => {
        rl.close();
    });
})

// close事件监听
rl.on('close', () => {
    process.exit(0);
});
