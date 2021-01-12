const parseConfig = require("../lib/basic/parseConfig")
const configTemplateApps = require("../lib/template/configTemplateApps")

console.log(JSON.stringify(parseConfig(configTemplateApps), "\n ", 4))
