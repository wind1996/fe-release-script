#!/usr/bin/env node
const program = require('commander');
const {version} = require("../package.json")
program.version(version);
program.description('用于项目构建发布的终端工具')

program
    .command("config")
    .description("生成配置文件")
    .action(function () {
        require('../lib/cmdEntrance/generztorConfigFile');
    })

program
    .command("start")
    .description("执行启动命令")
    .action(function () {
        require('../lib/cmdEntrance/startServerCommand');
    });

program
    .command("init")
    .description("初始化目录")
    .action(function (option) {
        require('../lib/cmdEntrance/initCommand');
    });

program
    .command("deploy")
    .description("发布项目")
    .action(function (name,options) {
        require('../lib/cmdEntrance');
    })


program.parse(process.argv);
