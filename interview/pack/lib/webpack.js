const { merge } = require("../utils");
const Compiler = require("./compiler");

function webpack(options) {
  // 合并配置项
  const mergeOptions = merge(options);

  // 创建compiler
  const compiler = new Compiler(mergeOptions);

  // 注册插件
  if (Array.isArray(options.plugins)) {
    for (const plugin of options.plugin) {
      if (typeof plugin === "function") {
        plugin.call(compiler, compiler);
      } else {
        plugin.apply(compiler);
      }
    }
  }

  return compiler;
}

module.exports = webpack;
