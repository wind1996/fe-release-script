const inquirer = require("inquirer");

async function chooseApp(apps) {
    const appChoices = [];
    const appEnvAppMap = {};
    apps.forEach((app) => {
        const key = app.env;
        appEnvAppMap[key] = app
        appChoices.push(key)
    })

    const {app} = await inquirer.prompt([{
        type: "list",
        message: "检测到配置了多个环境，请进行选择",
        name: "app",
        choices: apps.map(app => ({
            name: app.env + (app.subTitle ? "(" + app.subTitle + ")" : ""),
            value: app
        })),
        filter: val => val
    }])
    return app
}


module.exports = chooseApp
