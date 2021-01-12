function createDeploy(deploy, baseConfig) {
    const result = {
        startCmd: deploy&&deploy.startCmd || baseConfig.startCmd || "",
        restartCmd: deploy&&deploy.restartCmd || baseConfig.restartCmd || "",
        targetDir: deploy&&deploy.targetDir || baseConfig.targetDir || "",
        tmpDir: deploy&&deploy.tmpDir || baseConfig.tmpDir || "",
        appName: deploy&&deploy.appName || baseConfig.appName || "",
        hosts: deploy&&deploy.hosts || baseConfig.hosts || []
    }
    return result
}

function App(appConfig, baseConfig) {
    this.env = appConfig.env || ""
    this.subTitle = appConfig.subTitle || "";
    const {buildTasks} = appConfig
    const {buildTasks: baseConfigBuildTasks} = baseConfig
    this.buildTasks = Array.isArray(buildTasks)
        ? buildTasks : Array.isArray(baseConfigBuildTasks)
            ? baseConfigBuildTasks : []
    const {deploy} = appConfig
    let _deploy = []
    if (Array.isArray(deploy)) {
        _deploy = deploy.map(dep => createDeploy(dep, baseConfig))
    } else {
        _deploy = [createDeploy(deploy, baseConfig)]
    }
    this.deploy = flatDeploy(_deploy)
}

function flatDeploy(deploy) {
    const result = [];
    deploy.forEach(dep => {
        const {hosts,...extraDep} = dep;
        if (typeof hosts === "string") {
            result.push({
                ...extraDep,
                host: hosts
            })
        }
        if (Array.isArray(hosts)) {
            hosts.forEach(host => {
                result.push({
                    ...extraDep,
                    host
                })
            })
        }
    })
    return result
}


function createApp(config, baseConfig) {
    return new App(config, baseConfig)
}

function createSingleApp(config) {
    return new App({}, config)
}

function parseConfig(config) {
    const apps = config.apps
    if (apps && Array.isArray(apps)) {
        return apps.map(app => createApp(app, config))
    }

    return [createSingleApp(config)];
}

module.exports = parseConfig
