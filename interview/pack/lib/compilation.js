const fs = require("fs-extra");
const path = require("path");
const parser = require("@babel/parser");

class Compilation {
  constructor(compiler) {
    this.compiler = compiler;
    this.context = compiler.context;
    this.options = compiler.options;

    this.moduleCode = null;
    // 缓存所有依赖模块对象
    this.modules = new Set();
    // 缓存所有入口模块对象
    this.entries = new Map();
    // 所有代码块对象
    this.chunks = new Set();
    // 缓存本次产出的文件对象
    this.assets = {};
  }

  build() {
    // 读取配置入口
    const entry = this.getEntry();

    // 构建入口模块
    Object.keys(entry).forEach((entryName) => {
      const entryPath = entry[entryName]; // 入口文件路径

      const entryData = this.buildModule(entryName, entryPath);

      this.entries.set(entryName, entryData);
    });
  }

  getEntry() {
    let entry = Object.create(null);

    const { entry: optionsEntry } = this.options;

    if (!optionsEntry) {
      entry["main"] = "src/index.js";
    } else if (typeof optionsEntry === "string") {
      entry["main"] = optionsEntry;
    } else {
      entry = optionsEntry;
    }

    Object.keys(entry).forEach((key) => {
      entry[key] = "./" + path.posix.relative(this.context, entry[key]);
    });

    return entry;
  }

  buildModule(moduleName, modulePath) {
    // 读取文件代码
    const originSourceCode = fs.readFileSync(modulePath, "utf-8");
    this.moduleCode = originSourceCode;

    // 调用loader进行处理
    this.runLoaders(modulePath);

    // 调用webpack进行模块编译 创建module对象
    const module = this.handleWebpackCompiler(moduleName, modulePath);
    return module;
  }

  runLoaders(modulePath) {
    const matchLoaders = [];

    // 找到与模块相匹配的loader
    const rules = this.options.module.rules;

    rules.forEach((loader) => {
      const testRule = loader.test;
      if (testRule.test(modulePath)) {
        if (loader.loader) {
          matchLoaders.push(loader.loader);
        } else {
          matchLoaders.push(...loader.use);
        }
      }
    });

    // 倒序执行loader
    for (let i = matchLoaders.length - 1; i >= 0; i--) {
      const loaderFn = require(matchLoaders[i]);

      this.moduleCode = loaderFn(this.moduleCode);
    }
  }

  handleWebpackCompiler(moduleName, modulePath) {
    // 创建module
    const moduleId = "./" + path.posix.relative(this.context, modulePath);

    const module = {
      id: moduleId,
      dependencies: new Set(), // 存储该模块所依赖的子模块
      entryPoint: [moduleName], // 该模块所属的入口文件
    };

    const ast = parser.parse(this.moduleCode, {
      sourceType: "module",
    });

    traverse(ast, {
      CallExpression: (nodePath) => {
        const node = nodePath.node;

        if (node.callee.name === "require") {
          const requirePath = node.arguments[0].value;
        }
      },
    });
  }
}

module.exports = Compilation;
