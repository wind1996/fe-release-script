const inquirer = require("inquirer");
const chalk = require('chalk');

const initCommand = require("../tasks/initServerEnv")

async function main() {
    const promptResult = await inquirer.prompt([{
        type: "confirm",
        message: "确认初始化服务器部署目录",
        // message: chalk.redBright.bold("确认初始化服务器部署目录"),
        name: "confirm",
        default: true,
        suffix: '(默认true)'
    },])
    if (promptResult.confirm) {
        console.log("开始初始化服务器部署目录")
        await initCommand()
    }
}

main()
