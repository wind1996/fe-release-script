const shell = require("shelljs")
const inquirer = require("inquirer");
const chalk = require("chalk")

async function buildPackage(buildConf) {
    const {projRoot, buildTasks} = buildConf

    shell.cd(projRoot);
    console.log("切换到" + projRoot + "目录")
    const buildContext = {}

    for (let i = 0; i < buildTasks.length; i++) {
        const {name, cmd, task, confirm} = buildTasks[i]

        const tipText = cmd ? name + "(" + cmd + ")" : name + "(自定义task)"

        let execStep = false
        // 可以跳过的构建命令
        if (confirm) {
            const promptResult = await inquirer.prompt([{
                type: "confirm",
                message: `确定要执行:${tipText},Y:执行，N:跳过`,
                name: "execStep",
                default: true,
                suffix: '(默认true)'
            },])
            execStep = promptResult.execStep
        } else {
            execStep = true
        }
        if (execStep) {
            console.log(chalk.bold(`\n--------------开始执行：${tipText}----------------\n`));
            if (cmd !== undefined) {
                shell.exec(cmd)
            } else {
                await task(buildContext)
            }
            console.log(chalk.greenBright.bold(`\n--------------执行完毕：${tipText}----------------\n`));
        } else {
            console.log(chalk.redBright.bold(`${tipText}被跳过\n`));
        }
    }
}

module.exports = buildPackage
