const path = require("path")
const {configFileFileName} = require("../config")
const parseConfig = require("./parseConfig")

const projRoot = process.cwd();

let customConfig = {}
try {
    customConfig = require(path.join(projRoot, configFileFileName))
} catch (e) {
    console.log(e)
    console.error("没有获取到配置文件或解析配置文件出错：", path.join(projRoot, configFileFileName))
    console.log("可以执行 fe-release-script config 在当前目录自动生成配置文件模板")
    process.exit(1)
}

const config = parseConfig(customConfig)
config.projRoot = projRoot
config.appName = customConfig.appName
// console.log("解析后的配置为", JSON.stringify(config, "\n", 4))

module.exports = config;
