const shell = require('shelljs');
const chalk = require('chalk');
const config = require("../basic/config")

const {appName} = config

const {startCmd, targetDir, tmpDir, hosts, projRootPath, projectName} = config

function startServer(deployMachines) {
    return new Promise(resolve => {
        shell.cd(projRootPath);

        deployMachines.forEach((vm) => {
            const {targetDir, host, startCmd} = vm
            console.log("\n" + chalk.bold(`开始在服务器 ${host} 的${targetDir}${appName}目录执行${startCmd}启动服务`));
            shell.exec(`ssh ${host} "cd ${targetDir}${appName};${startCmd};"`);
            console.log("\n" + chalk.greenBright.bold(`服务器${host}开启服务成功：开启命令为${startCmd}`));
        });

        console.log(chalk.greenBright.bold('所有服务器开启服务成功!'));
        resolve()
    })
}

module.exports = startServer;
