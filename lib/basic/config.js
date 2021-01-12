const path = require("path")
const {configFileFileName} = require("../config")
const parseConfig = require("./parseConfig")

const projRoot = process.cwd();

let customConfig = {}
try {
    customConfig = require(path.join(projRoot, configFileFileName))
} catch (e) {
    console.error("e", e)
    throw("请配置配置文件" + configFileFileName + "初始化错误")
}

const config = parseConfig(customConfig)
config.projRoot = projRoot
config.appName = customConfig.appName
// console.log("解析后的配置为", JSON.stringify(config, "\n", 4))

module.exports = config;
