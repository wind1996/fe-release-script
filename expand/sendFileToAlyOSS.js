const OSS = require('ali-oss');
const fs = require("fs");
const glob = require("glob")
const path = require("path")

const upload = async function (file, {ossBaseDir, cwd}) {
    const filePath = path.join(cwd, file);
    const ossPath = path.join(ossBaseDir, file);
    console.error("lllllll", filePath, ossPath)
    return await this.client.put(ossPath, filePath);
}

const getFileList = async (pattern, options = {}) => {
    return new Promise(((resolve, reject) => {
        glob(pattern,
            Object.assign({
                ignore: ["./node_modules/**", "./ossConf.js"],
                nodir: true,
            }, options),
            (err, fileList) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(fileList)
            })
    }))
}

const main = (conf) => {
    const instance = {}
    const client = new OSS(conf);
    let cwd = process.cwd()
    let ossBaseDir = ""

    async function uploadFileToOss(file) {
        return upload.call({client}, file, {ossBaseDir, cwd})
    }

    instance.config = function config(params) {
        if (params.cwd) {
            cwd = params.cwd
        }
        if (params.ossBaseDir) {
            ossBaseDir = params.ossBaseDir
        }
        return instance
    }

    instance.uploadFile = async (pattern = "./**", options = {}, target = {}) => {
        if (target.ossBaseDir) {
            ossBaseDir = target.ossBaseDir
        }
        try {
            const fileList = await getFileList(pattern, options)
            console.log("fileList", fileList)
            for (let i = 0; i < fileList.length; i++) {
                await uploadFileToOss(fileList[i])
            }
            return Promise.resolve()
        } catch (e) {
            return Promise.reject(e)
        }
    }

    return instance
}

module.exports = {
    createALyOssHelper: main
}
