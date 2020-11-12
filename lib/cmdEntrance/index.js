const chalk = require('chalk');
const basicInfo = require("../basic/projectBasicInfo")
const shell = require("shelljs")
const config = require("../basic/config")
const inquirer = require("inquirer");

console.log("开始发布项目")
console.log("此项目的目录是：" + config.projRootPath)
console.log("代码版本：" + basicInfo.codeVersion)

const release = require("../tasks/releaseServer")

async function main() {
    const {startBuild} = await inquirer.prompt([{
        type: "confirm",
        message: "确认开始进行构建,将依次执行配置的构建命令",
        name: "startBuild",
        default: true,
        suffix: '(默认true，如果已经构建可以跳过此步骤)'
    },])

    if (startBuild) {
        shell.cd(config.projRootPath);
        const buildShell = config.buildShell

        for (let i = 0; i < buildShell.length; i++) {
            const {name, cmd, confirm} = buildShell[i]
            const {execStep} = await inquirer.prompt([{
                type: "confirm",
                message: "确定要执行可选命令" + name,
                name: "execStep",
                default: true,
                suffix: '(默认true)'
            },])
            if (execStep) {
                console.log(chalk.bold('\n开始执行： ' + name));
                shell.exec(cmd)
                console.log(chalk.greenBright.bold(name + '执行完毕！！！\n\n'));
            }
        }
    }

    const {startRelease} = await inquirer.prompt([{
        type: "confirm",
        message: chalk.redBright.bold("确认开始发布到服务器"),
        name: "startRelease",
        default: false,
        suffix: '(默认false，请手动确保已构建完成)'
    },])

    if (startRelease) {
        await release()
    }
    console.log("所有操作均已经完成")
}

main()
