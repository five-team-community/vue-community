
// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.106.28.24:8080', // 服务器地址
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true, // 本地会虚拟一个服务端接收你的请求并代你发送该请求
        secure: false  // 当代理某些 https 服务时用
      }
    }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}