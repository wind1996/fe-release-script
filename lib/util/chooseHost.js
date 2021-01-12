const inquirer = require("inquirer");

async function chooseHost(app) {
    const {deploy} = app

    if (deploy.length === 1) {
        return deploy
    }

    console.log("\n--------------选择目标机器--------------\n")
    const {vm} = await inquirer.prompt([{
        type: "checkbox",
        message: "请选择要发布到的服务器",
        name: "vm",
        choices: deploy.map(deploy => ({
            name: deploy.host,
            value: deploy
        })),
        filter: val => val
    }])
    return vm
}

module.exports = chooseHost
