module.exports = {
    startCmd: "pm2 start pm2.json",
    restartCmd: "pm2 reload example.prod",
    targetDir: "/data/example/",
    tmpDir: "/tmp/example",
    projectName: "example",
    hosts: ['root@ip'],
    buildShell: [
        {
            cmd: "npm install",
            name: "安装依赖包",
            // 执行此步骤时是否需要跳过
            confirm: true,
        },
        {
            cmd: `npm run build`,
            name: "构建项目"
        }
    ]
}
