const fs = require("fs-extra");
const path = require("path");

class MyWebpackPlugin {
  apply(compiler) {
    const outputPath = compiler.options.output.path;
    const hooks = compiler.hooks;

    // 清除build目录
    hooks.compiler.tap("custom-webpack-plugin", () => {
      fs.removeSync(outputPath);
    });

    // 复制静态资源
    const assetsFilePath = path.resolve(outputPath, "../src/assets");
    hooks.done.tap("custom-webpack-plugin", () => {
      fs.copySync(assetsFilePath, path.resolve(outputPath, "assets"));
    });
  }
}

module.exports = MyWebpackPlugin;
