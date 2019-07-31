const path = require('path')
// 会在打包结束后，自动生成html文件，并把打包生成的js自动引入到html中
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html' // 模版文件
    }),
    new CleanWebpackPlugin()
  ]
}

// babel-preset-env只做了语法转换 然而低版本浏览器依旧没有es6的某些函数，还需要
// 安装polyfill，来进行补充这些函数方法
