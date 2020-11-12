const shell = require('shelljs');
const chalk = require('chalk');
const config = require("../basic/config")

const {startCmd, targetDir, tmpDir, hosts, projRootPath, projectName} = config

function startServer() {
    return new Promise((resolve => {
        shell.cd(projRootPath);

        hosts.forEach((host) => {
            console.log(chalk.bold(`在${host}上创建${targetDir}目录`));
            // sudo mkdir -p ${targetDir}${projectName};
            shell.exec(`ssh ${host} "
        sudo mkdir -p ${targetDir}${projectName}.lastest.${Date.now()}/;
        "`);
            console.log(chalk.greenBright.bold(`已成功在${host}上创建${targetDir}目录`));
        });

        console.log(chalk.greenBright.bold('所有服务器初始化目录成功'));
        resolve()

    }))
}

module.exports = startServer;
