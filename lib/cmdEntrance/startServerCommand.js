const inquirer = require("inquirer");
const startServerCommand = require("../tasks/startServer")

async function main() {
    const promptResult = await inquirer.prompt([{
        type: "confirm",
        message: "确认去服务器上执行启动命令 startCmd",
        name: "confirm",
        default: true,
        suffix: '(默认true)'
    },])
    if (promptResult.confirm) {
        console.log("开始启动服务器上服务")
        await startServerCommand()
    }
}

main()
