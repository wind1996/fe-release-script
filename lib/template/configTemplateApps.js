module.exports = {
    startCmd: "pm2 start pm2.json",
    restartCmd: "pm2 reload example.prod",
    targetDir: "/data/example/",
    tmpDir: "/tmp/example",
    appName: "example",
    buildTasks: [{
        cmd: "npm install",
        name: "安装依赖包",
        confirm: true,
    }],
    hosts: ['root@ip'],
    apps: [{
        env: "test",
        subTitle: "这是测试环境",
        buildTasks: [{
            cmd: "npm install2",
            name: "安装依赖包2",
            confirm: true,
        }],
        deploy: [{
            startCmd: "pm2 start pm2.json",
            restartCmd: "pm2 reload example.prod",
            targetDir: "/data/example/",
            tmpDir: "/tmp/example",
            hosts: 'root@ip'
        }],
    }, {
        env: "pre-online",
        subTitle: "这是正式环境",
        deploy: [{
            hosts: 'root@ip'
        }],
    }]
}
