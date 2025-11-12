const path = require('path');

const CompressionWebpackPlugin = require('compression-webpack-plugin');

const productionGzipExtensions = ['js', 'css'];

function resolve(dir) {
  return path.join(__dirname, dir);
}
const name = '嗨喵悦动'; // 标题
module.exports = {
  publicPath:
    process.env.VUE_APP_ENV === 'production'
      ? 'https://static.hudongmiao.com/hmydh5-qn/'
      : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: 80,
    open: false,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'https://shm.hudongmiao.com/',
        // target: 'http://192.168.66.39:8022/',
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_BASE_API}`]: '',
        },
      },
    },
    disableHostCheck: true,
  },
  configureWebpack: {
    name,
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    plugins: [
      // 配置compression-webpack-plugin压缩
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
  },
};
