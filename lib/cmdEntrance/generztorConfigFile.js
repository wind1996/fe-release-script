const fs = require("fs")
const path = require("path")
const ora = require("ora")
const configFileName = "feReleaseScript.config.js"

function generateFile() {
    const text = ora("正在生成配置问文件").start()
    fs.readFile(path.join(__dirname, "../template/configTemplate.js"), (err, data) => {
        if (err) throw err;
        fs.writeFile(process.cwd() + "/" + configFileName, data, (err) => {
            if (err) throw err;
            text.succeed('配置文件生成成功')
        })
    })
}

try {
    fs.statSync(process.cwd() + "/" + configFileName);
    //如果可以执行到这里那么就表示存在了
    console.log('已存在配置文件，如果想重新生成，请去掉配置文件,然后在执行此命令');
} catch (e) {
    //捕获异常
    generateFile()
}
