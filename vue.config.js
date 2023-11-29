const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: "source-map"
  },
  devServer:{
    proxy:{
      '/apis':{
        target: 'http://49.235.106.165:8088/',
        secure: false,
        changeOrigin: true,
        pathRewrite:{
          '^/apis':''
        }
      }
    }
  }
})
