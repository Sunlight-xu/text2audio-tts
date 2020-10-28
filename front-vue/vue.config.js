module.exports = {
  productionSourceMap: false,
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:8888', //你要跨域的网址  比如  'http://news.baidu.com',
        // secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //这个参数是用来回避跨站问题的，配置完之后发请求时会自动修改http header里面的host，但是不会修改别的
        pathRewrite: {
          '^/api': '' //路径的替换规则
        }
      }
    },
    overlay: {
      warnings: false,
      errors: true
    }
  }
}