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
          // 寻找模块绝对路径
          const moduleDirName = path.posix.dirname(modulePath);
          const absolutePath = tryExtensions(
            path.posix.join(moduleDirName, requirePath),
            this.options.resolve.extensions,
            requirePath,
            moduleDirName
          );
          // 创建 moduleId
          const moduleId =
            "./" + path.posix.relative(this.context, absolutePath);
          // 将 require 变成 __webpack_require__ 语句
          node.callee = t.identifier("__webpack_require__");
          // 修改模块路径（参考 this.context 的相对路径）
          node.arguments = [t.stringLiteral(moduleId)];

          if (
            !Array.from(this.modules).find((module) => module.id === moduleId)
          ) {
            // 在模块的依赖集合中记录子依赖
            module.dependencies.add(moduleId);
          } else {
            // 已经存在模块集合中。虽然不添加进入模块编译 但是仍要在这个模块上记录被依赖的入口模块
            this.modules.forEach((module) => {
              if (module.id === moduleId) {
                module.entryPoint.push(moduleName);
              }
            });
          }
        }
      },
    });
  }
}

module.exports = Compilation;
