## fe-release-script

## 作用
用于node js项目的前端上线

## 安装

```shell script
npm i -D git+https://github.com/wind1996/fe-release-script.git#master
npm i -D git+https://github.com/wind1996/fe-release-script.git#develop
```
## 使用
```
node ./node_modules/fe-release-script/bin/index.js config
node ./node_modules/fe-release-script/bin/index.js init
node ./node_modules/fe-release-script/bin/index.js
node ./node_modules/fe-release-script/bin/index.js start

node ./node_modules/fe-release-script/bin/index.js init && node ./node_modules/fe-release-script/bin/index.js && node ./node_modules/fe-release-script/bin/index.js start
```
#### 安装
- 安装稳定版 `npm i -D git+https://github.com/wind1996/fe-release-script.git#master` 
- 安装最新版 `npm i -D git+https://github.com/wind1996/fe-release-script.git#develop` 

#### fe-release-script config
在项目根目录下生成发布的配置文件 feReleaseScript.config.js

#### fe-release-script init
在服务器创建项目对应的文件夹用于存放项目

#### fe-release-script
将项目发布到服务器

1. 依次执行配置的构建命令，在这个阶段完成打包，上传OSS等操作
2. 将打包后文件夹使用 rsync 同步到服务器上的 tmpDir 
3. 使用 tmpDir 的内容覆盖  targetDir(项目的部署目录)
4. 执行配置的重启命令

如果 hosts 含有多项，则针对于每一台机器执行上面的步骤

#### fe-release-script start
去 hosts 的机器上的 targetDir/projectName目录上执行配置的 startCmd。用于首次部署项目时，启动服务。

## 注意
- 确保用户对所配置的 tmpDir 目录有写入权限
- 确保服务器上已经通过配置使得服务器上可以无密码使用su命令
