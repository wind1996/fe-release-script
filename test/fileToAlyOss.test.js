const {ossConf} = require("../ossConf");
const {createALyOssHelper} = require("../expand/sendFileToAlyOSS")

const store = createALyOssHelper(ossConf);

store.config({
    ossBaseDir:"c/a/g"
})

store.uploadFile("./README.md").then(() => {
    console.log("上传成功")
}).catch((e) => {
    console.error(e)
    console.log("上传出错了")
})
