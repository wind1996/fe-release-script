const path = require('path');
const shell = require('shelljs');


function getBaseCodeVersion(projRootPath) {
    shell.cd(projRootPath);
    const gitTag = shell.exec('git for-each-ref --count=1 --sort=-taggerdate --format "%(tag)" refs/tags');
    const currentBranchLastTag = shell.exec('git describe --abbrev=0 --tags');
    const committerDate = shell.exec('git log -1 --pretty=format:"%cd"');
    const committerDateRelative = shell.exec('git log -1 --pretty=format:"%cr"');
    const abbreviatedCommitHash = shell.exec('git log -1 --pretty=format:"%h"');
    const abbreviatedCommitMessage = shell.exec('git log -1 --pretty=format:"%s"');
    const abbreviatedCommitAuthName = shell.exec('git log -1 --pretty=format:"%an"');
    const refNames = shell.exec('git log -1 --pretty=format:"%D"');
    const currentBranch = shell.exec("git rev-parse --abbrev-ref HEAD")

    return {
        refNames: refNames.stdout,
        currentBranch: currentBranch.stdout.replace('\n', ''),
        currentBranchLastTag: currentBranchLastTag.stdout.replace('\n', ''),
        abbreviatedCommitHash: abbreviatedCommitHash.stdout,
        abbreviatedCommitMessage: abbreviatedCommitMessage.stdout,
        abbreviatedCommitAuthName: abbreviatedCommitAuthName.stdout,
        committerDate: committerDate.stdout,
        committerDateRelative: committerDateRelative.stdout,
        gitTag: gitTag.stdout.replace("\n", "")
    }
}


module.exports = {getBaseCodeVersion};
