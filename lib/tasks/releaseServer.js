const shell = require('shelljs');
const chalk = require('chalk');
const config = require("../basic/config")

const {restartCmd, targetDir, tmpDir, hosts, projRootPath, projectName} = config

function releaseServer(success) {
    console.log('发布项目中');

    shell.cd(projRootPath);

    hosts.forEach((host) => {
        console.log(chalk.bold(`开始发布到机器：${host}`));
        console.log(chalk.bold(`将文件同步到服务器临时存储目录`));

        shell.exec(`rsync -avzP --delete * ${host}:${tmpDir}`);
        // shell.exec(`rsync -avzP --delete * ${host}:${tmpDir}`);
        console.log(chalk.greenBright.bold('rsync complete!'));

        console.log(chalk.bold(`备份当前服务的文件，使用存储在临时存储目录的最新文件替换当前线上运行的文件，使用重启命令:${restartCmd}重启服务`));

        shell.exec(`ssh ${host} "
sudo rm -r ${targetDir}${projectName}.lastest*/;
sudo cp -r ${tmpDir}/ ${targetDir}${projectName}.new/;
sudo mv ${targetDir}${projectName} ${targetDir}${projectName}.lastest.${Date.now()}/;
sudo mv ${targetDir}${projectName}.new ${targetDir}${projectName};
${restartCmd};
"`);
        console.log(chalk.greenBright.bold(`发布机器: ${host}成功`));
    });

    console.log(chalk.greenBright.bold('所有机器发布成功!'));

    success();
}


function releaseServerPromise() {
    return new Promise(resolve => {
        releaseServer(() => {
            resolve();
        });
    })
}

module.exports = releaseServerPromise;
