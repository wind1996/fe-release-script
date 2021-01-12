const shell = require('shelljs');
const chalk = require('chalk');
const config = require("../basic/config")

const {appName} = config

function startServer(deployMachines) {
    return new Promise((resolve => {
        deployMachines.forEach((vm) => {
            const {targetDir, tmpDir, host} = vm
            console.log(chalk.bold(`在${host}上创建${targetDir}目录`));

            // sudo mkdir -p ${targetDir}${projectName};
            shell.exec(`ssh ${host} "
                sudo mkdir -p ${targetDir}${appName}.lastest.${Date.now()}/;
            "`);
            console.log(chalk.greenBright.bold(`已成功在${host}上创建${targetDir}目录`));
        });
        resolve()
    }))
}

module.exports = startServer;
