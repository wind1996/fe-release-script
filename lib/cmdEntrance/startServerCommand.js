const inquirer = require("inquirer");
const startServerCommand = require("../tasks/startServer")
const chalk = require('chalk');
const config = require("../basic/config")
const chooseApp = require("../util/chooseApp")
const chooseHost = require("../util/chooseHost")

async function main() {
  let app = config[0]
    if (config.length > 0) {
        app = await chooseApp(config)
    }

    console.log("----------------------- 开始执行启动命令 -----------------------")

    let deployMachines = await chooseHost(app)

    if (deployMachines.length) {
        const {startRelease} = await inquirer.prompt([{
            type: "confirm",
            message: "确认开始执行启动命令" + chalk.redBright.bold(deployMachines.map(({host}) => host).join(",")),
            name: "startRelease",
            default: true,
            suffix: '(默认Y)'
        },])

        if (startRelease) {
            await startServerCommand(deployMachines)
        } else {
            console.log("已成功取消执行启动命令，流程结束")
        }
    } else {
        console.log("没有选择机器，流程结束")
    }

    // const promptResult = await inquirer.prompt([{
    //     type: "confirm",
    //     message: "确认去服务器上执行启动命令 startCmd",
    //     name: "confirm",
    //     default: true,
    //     suffix: '(默认true)'
    // },])
    // if (promptResult.confirm) {
    //     console.log("开始启动服务器上服务")
    //     await startServerCommand()
    // }
}

main()
