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

function merge(options) {
  const params = process.argv.slice(2).reduce((options, argv) => {
    const [key, value] = argv.split("=");

    if (key && vale) {
      const parseKey = key.slice(2);
      options[parseKey] = value;
    }

    return options;
  }, {});

  return { ...options, ...params };
}

module.exports = webpack;
