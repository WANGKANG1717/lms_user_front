const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    lintOnSave: false,
    transpileDependencies: true,
    devServer: {                //记住，别写错了devServer
        port: 9876,             //设置本地默认端口  选填
        proxy: {                //设置代理，必须填
            '/api': {           //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                // target: 'http://101.35.169.211:8989',     //代理的目标地址
                target: 'http://127.0.0.1:8989',
                changeOrigin: true,                  //是否设置同源，输入是的
                pathRewrite: {                       //路径重写
                    '/api': ''                       //选择忽略拦截器里面的单词
                },
                logLevel: 'debug'
            }
        }
    }
})