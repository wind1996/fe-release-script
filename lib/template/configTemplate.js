const {createALyOssHelper} = require("fe-release-script/expand/sendFileToAlyOSS.js")

async function upload() {
    return createALyOssHelper({
        region: 'oss-cn-beijing',
        accessKeyId: '',
        accessKeySecret: '',
        bucket: '',
        timeout: 1000 * 1000,
    }).uploadFile("./build/**", {}, {ossBaseDir: "website/"})
}

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
        },
        {
            task: upload,
            name: "上传打包后的资源到阿里云",
            confirm:true,
        }
    ]
}
