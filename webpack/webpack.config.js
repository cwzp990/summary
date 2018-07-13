// module.exports = {
//     entry: '',                       入口文件
//     output: {},                      出口文件
//     module: {},                      处理对应模块
//     plugins: [],                     对应的插件
//     devServer: {},                   开发服务器配置
//     mode: 'development'              模式配置
// }

// const path = require('path');

// module.exports = {
//     entry: './src/index.js',
//     output: {
//         filename: 'bundle.js',       打包后的文件名称
//         path: path.resolve('dist')   打包后的目录，必须是绝对路径
//     }
// }

/**
 *      多入口文件：
 *      1.之间没有关系，但要打包到一起，可以写一个数组，实现多个文件打包
 *      2.每一个文件单独打包成一个文件
 * **/

let path = require('path');

// html打包 需要安装
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 1.多入口文件，这里打包的文件都合成了一个
   //  entry: ['./src/index.js', './src/login.js'],
    // 2,多入口和多出口需要写出对象的方式
    entry: {
        index: './src/index.js'
       //  login: './src/login.js'
    },
    output: {
        // [name]就可以将出口名和入口文件一一对应
       //  filename: '[name].js',
       filename: 'bundle.[hash:4].js',
       path: path.resolve('dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',      // 用哪个html作为模板
            hash: true                         // 在打包好的bundle.js后面加上hash串
        })
    ]
}
