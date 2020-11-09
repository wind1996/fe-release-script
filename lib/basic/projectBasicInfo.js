const path = require('path');
const shell = require('shelljs');
const config = require("./config")


function getBaseCodeVersion() {
    shell.cd(config.projRootPath);
    const gitTag = shell.exec('git for-each-ref --count=1 --sort=-taggerdate --format "%(tag)" refs/tags');
    return gitTag.stdout.replace('\n', '');
}

const basicInfo = {
    codeVersion: getBaseCodeVersion()
};

module.exports = basicInfo;
