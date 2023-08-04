const fs = require("fs-extra");
const path = require("path");
const { SyncHook } = require("tapable");
const Compilation = require("./compilation");

class Compiler {
  constructor(options) {
    this.options = options;

    this.context = this.options.context || process.cwd().replace(/\\/g, "/");

    this.hooks = {
      // 开始编译的钩子
      run: new SyncHook(),
      // 模块解析完成，向磁盘写入输出文件执行的钩子
      emit: new SyncHook(),
      // 输出文件写入完成后执行的钩子
      done: new SyncHook(),
    };
  }

  run(cb) {
    // 触发 run hook
    this.hooks.run.call();

    // 创建compilation编译对象
    const compilation = new Compilation(this);

    // 编译模块
    compilation.build();
  }

  emit(compilation, cb) {}
}

module.exports = Compiler;
