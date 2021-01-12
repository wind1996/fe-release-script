const inquirer = require("inquirer");
const chalk = require('chalk');
const config = require("../basic/config")
const chooseApp = require("../util/chooseApp")
const chooseHost = require("../util/chooseHost")

const initWorkDir = require("../tasks/initServerEnv")

async function main() {

    let app = config[0]
    if (config.length > 0) {
        app = await chooseApp(config)
    }

    console.log("----------------------- 开始初始化工作目录 -----------------------")

    let deployMachines = await chooseHost(app)

    if (deployMachines.length) {
        const {startRelease} = await inquirer.prompt([{
            type: "confirm",
            message: "确认开始初始化工作目录" + chalk.redBright.bold(deployMachines.map(({host}) => host).join(",")),
            name: "startRelease",
            default: true,
            suffix: '(默认Y)'
        },])

        if (startRelease) {
            await initWorkDir(deployMachines)
        } else {
            console.log("已成功取消初始化工作目录，流程结束")
        }
    } else {
        console.log("没有选择机器，流程结束")
    }


    /*    const promptResult = await inquirer.prompt([{
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
        }*/
}

main()
