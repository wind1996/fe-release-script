const fs = require("fs")

function checkHasGitRepo(projectRoot) {
    try {
        fs.statSync(path.join(projectRoot, ".git"))
        return true
    } catch (e) {
        return false
    }
}

module.exports = checkHasGitRepo
