interface App {
    env: string;
    subTitle: string;
    buildTasks: Array<{
        cmd?: string
        name?: string
        confirm?: boolean
    }>,
    deploy: Array<{
        startCmd?: string
        restartCmd?: string
        targetDir?: string
        tmpDir?: string
        appName?: string
        hosts?: Array<string>
    }>

}

declare module "config" {
    const config: Array<App>
    export = config
}
