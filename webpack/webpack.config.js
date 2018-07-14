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

let webpack = require('webpack')

 // html打包 需要安装
let HtmlWebpackPlugin = require('html-webpack-plugin');

//  普通css打包最后是以行内样式呈现的，我们需要用link引入
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

// 我们每次npm run build都会在dist目录下创建很多打好的包，如果积累过多会很混乱
let CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    // 1.多入口文件，这里打包的文件都合成了一个
    //  entry: ['./src/index.js', './src/login.js'],
    // 2,多入口和多出口需要写出对象的方式
    entry: {
        index: './src/index.js',
        login: './src/login.js'
        //  login: './src/login.js'
    },
    output: {
        // [name]就可以将出口名和入口文件一一对应
        filename: '[name].js',
        // filename: 'bundle.[hash:4].js',
        path: path.resolve('dist')
    },
    // 配置别名
    resolve: {
        // 别名
        alias: {
            $: './src/jquery.js'
        },
        // 省略后缀
        extensions: ['.js', '.json', '.css']
    },
    // 启动静态服务器
    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: 3000,
        open: true,         // 自动打开浏览器
        hot: true           // 开启热更新 这里还需配置一个webpack插件并且检查js里是否有module.hot
    },

    // 还需要在主要的js文件里写入下面这段代码
    // if (module.hot) {
    //     // 实现热更新
    //     module.hot.accept();
    // }

    // 打包css需要引入loader 预处理器需要引入相应loader 并且安装
    module: {
        rules: [
            {
                test: /\.css$/,                         // 解析css
                // use: ['style-loader', 'css-loader']     从右向左解析
                // use: [
                //     {loader: 'style-loader'},
                //     {loader: 'css-loader'}
                // ]
                use: ExtractTextWebpackPlugin.extract({
                    use: 'css-loader'                   // 这里不需要style-loader了
                })
            },
            // 处理图片也需要下载loader
            // 如果是在css文件里引入背景图之类的图片，就需要指定一下相对路径
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,                // 小于8k的图片自动转换成base64格式，并且不会存在实体图片
                            outputPath: 'images/'       // 图片打包后存放的目录
                        }
                    }
                ]
            },
            // img标签里引用的图片地址也需要一个loader来处理
            // npm i html-withimg-loader -D
            {
                test: /\.(htm|html)$/,
                use: 'htm-withimg-loader'
            },
            // 字体图标
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader','postcss-loader']
            },
            // 将es6转成es5
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: /src/,         // 只转化src目录下的js
                exclude: /node_modules/ // 排除项目依赖里的js
            }
        ]
    },
    // 例如，index.js和login.js里含有相同的js代码，我们可以把它提取出来
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 抽离第三方插件
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10
                },
                // 抽离自己写的公共代码，名字任意起
                utils: {
                    chunks: 'initial',
                    name: 'utils',      // 名字任意
                    minSize: 0          // 只要超出0字节就生成一个新包
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',      // 用哪个html作为模板
            filename: 'index.html',
            hash: true                         // 在打包好的bundle.js后面加上hash串
        }),
        new HtmlWebpackPlugin({
            template: './src/login.html',
            filename: 'login.html',
            hash: true
        }),
        // css打包的目录
        new ExtractTextWebpackPlugin('css/style.css'),
        // 清空打包目录
        new CleanWebpackPlugin('dist'),
        // 开启热更新
        new webpack.HotModuleReplacementPlugin(),
        // 引入css3前缀插件，在module里配置
        require('autoprefixer')
    ]
}