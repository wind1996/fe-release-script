const shell = require('shelljs');
const chalk = require('chalk');
const config = require("../basic/config")

const {projRoot, appName} = config

function deployToECS({host, tmpDir, restartCmd, targetDir}) {

    shell.cd(projRoot);

    console.log(chalk.bold(`开始发布到机器：${host}`));
    console.log(chalk.bold(`将文件同步到服务器临时存储目录`));
    shell.exec(`rsync -avzP --delete * ${host}:${tmpDir}`);
    // shell.exec(`rsync -avzP --delete * ${host}:${tmpDir}`);
    console.log(chalk.greenBright.bold('同步到临时存储目录成功!'));

    console.log(chalk.bold(`备份当前服务的文件，使用存储在临时存储目录的最新文件替换当前线上运行的文件，使用重启命令:${restartCmd}重启服务`));

    shell.exec(`ssh ${host} "
            sudo rm -r ${targetDir}${appName}.lastest*/;
            sudo cp -r ${tmpDir}/ ${targetDir}${appName}.new/;
            sudo mv ${targetDir}${appName} ${targetDir}${appName}.lastest.${Date.now()}/;
            sudo mv ${targetDir}${appName}.new ${targetDir}${appName};
            ${restartCmd};
            "`);
    console.log(chalk.greenBright.bold(`发布机器: ${host}成功`));
}

function releaseServer(success, config, error) {
    try {
        const {restartCmd, targetDir, tmpDir, host} = config
        deployToECS({restartCmd, targetDir, tmpDir, host})
        success();
    } catch (e) {
        error(e)
    }
}


function releaseServerPromise(machine) {
    return new Promise((resolve, reject) => {
        releaseServer(() => {
            resolve();
        }, machine, (e) => {
            reject(e)
        });
    })
}

async function releaseMachines(deployMachines) {
    return new Promise((resolve => {
        const result = []
        for (let i = 0; i < deployMachines.length; i++) {
            try {
                console.log(`### 将要开始发布第${i + 1}台机器（${deployMachines[i].host}）,已成功（${result.length}/${deployMachines.length}）`)
                releaseServerPromise(deployMachines[i])
                result.push(deployMachines[i].host)
            } catch (e) {
                console.log(e)
            }
        }
        resolve(result)
    }))
}

module.exports = releaseMachines;
