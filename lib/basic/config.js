const path = require("path")

const config = {
    restartCmd: "",
    targetDir: "",
    tmpDir: "",
    projectEnv: "",
    hosts: [],
    projectName: "",
    projRootPath: process.cwd(),
}

const configFileName = "feReleaseScript.config.js"
try {
    const customConfig = require(path.join(config.projRootPath, configFileName))
    config.restartCmd = customConfig.restartCmd
    config.targetDir = customConfig.targetDir
    config.tmpDir = customConfig.tmpDir
    config.hosts = customConfig.hosts
    config.projectName = customConfig.projectName
    config.buildShell = customConfig.buildShell
    config.startCmd = customConfig.startCmd
} catch (e) {
    throw("请配置配置文件：" + configFileName)
}

module.exports = config;
