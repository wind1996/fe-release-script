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
            name: "清空打包目录",
        },
        {
            cmd: "npm run clean",
            name: "清空打包目录",
        }
    ]
}
