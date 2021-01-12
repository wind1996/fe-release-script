const chalk = require('chalk');
const {getBaseCodeVersion} = require("../basic/projectBasicInfo")
const shell = require("shelljs")
const config = require("../basic/config")
const inquirer = require("inquirer");
const fs = require("fs")
const path = require("path")
const chooseApp = require("../util/chooseApp")
const checkHasGitRepo = require("../util/checkHasGitRepo")
const chooseHost = require("../util/chooseHost")
const release = require("../tasks/releaseServer")
const buildPackage = require("../tasks/buildPackage")

async function main() {
    let app = config[0]
    if (config.length > 0) {
        app = await chooseApp(config)
    }

    console.log("\n")
    console.log("*********************** 项目信息 ********************************")
    console.log("选择的环境：" + app.env + "",)
    console.log("项目的根目录：" + config.projRoot)

    if (checkHasGitRepo(config.projRoot)) {
        console.log("代码版本信息：" + JSON.stringify(getBaseCodeVersion(config.projRoot), "\n", 4))
    }

    console.log("\n*********************** 开始执行fe-release-script ***********************\n")
    console.log("----------------------- 开始执行构建步骤（第一步/共两步） -----------------------")

    const {startBuild} = await inquirer.prompt([{
        type: "confirm",
        message: "开始执行打包任务，Y:开始执行，N:跳过此步骤",
        name: "startBuild",
        default: true,
        suffix: '(默认Y)'
    },])


    if (startBuild) {
        await buildPackage({
            projRoot: config.projRoot,
            buildTasks: app.buildTasks
        })
    }

    console.log("----------------------- 开始发布项目步骤（第二步/共两步） -----------------------")

    let deployMachines = await chooseHost(app)

    if (deployMachines.length) {
        const {startRelease} = await inquirer.prompt([{
            type: "confirm",
            message: "确认开始执行发布步骤" + chalk.redBright.bold(deployMachines.map(({host}) => host).join(",")),
            name: "startRelease",
            default: true,
            suffix: '(默认Y)'
        },])

        if (startRelease) {
            const success = await release(deployMachines)
            console.log("\n----------------------- 发布完成，具体情况如下 -----------------------")
            deployMachines.forEach(({host}) => {
                if (success.includes(host)) {
                    console.log("发布到" + host + "成功")
                } else {
                    console.log(chalk.redBright("发布到" + host + "失败"))
                }
            })
        } else {
            console.log("已成功取消发布，流程结束")
        }
    } else {
        console.log("没有选择要发布到的机器，流程结束")
    }
}

main()
