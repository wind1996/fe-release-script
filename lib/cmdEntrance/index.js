const readline = require('readline');
const chalk = require('chalk');
const basicInfo = require("../basic/projectBasicInfo")
const shell = require("shelljs")
const config = require("../basic/config")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("开始发布项目")
console.log("此项目的目录是：" + config.projRootPath)
console.log("代码版本：" + basicInfo.codeVersion)


const buildShell = config.buildShell || [
    {
        cmd: "npm run clean",
        name: "清空打包目录",
    },
    {
        name: "打包项目",
        cmd: `npm run build`
    }
]

const release = require("../tasks/releaseServer")

rl.question(chalk.redBright.bold('确认以上信息无误,开始执行打包命令？（y/n）'), (confirm) => {
    if (confirm !== 'y') {
        rl.close();
        return;
    }
    shell.cd(config.projRootPath);
    buildShell.forEach(({name, cmd}) => {
        console.log(chalk.bold('\n开始执行： ' + name));
        shell.exec(cmd)
        console.log(chalk.greenBright.bold(name + '执行完毕！！！\n\n'));
    })

    rl.question(chalk.redBright.bold('确定进行发布？（y/n）'), (confirmUpload) => {
        if (confirmUpload !== 'y') {
            rl.close();
            return;
        }

        release(() => {
            rl.close();
        });
    });
})

rl.on('close', () => {
    process.exit(0);
});
