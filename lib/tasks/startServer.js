const shell = require('shelljs');
const chalk = require('chalk');
const config = require("../basic/config")

const {startCmd, targetDir, tmpDir, hosts, projRootPath, projectName} = config

function startServer(success) {
    shell.cd(projRootPath);

    hosts.forEach((host) => {
        console.log(chalk.bold(`开始在服务器 ${host} 的${targetDir}${projectName}目录执行${startCmd}启动服务`));
        shell.exec(`ssh ${host} "cd ${targetDir}${projectName};${startCmd};"`);
        console.log(chalk.greenBright.bold(`服务器${host}开启服务成功：开启命令为${startCmd}`));
    });

    console.log(chalk.greenBright.bold('所有服务器开启服务成功!'));

    success();
}

module.exports = startServer;
