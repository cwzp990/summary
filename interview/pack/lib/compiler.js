class Compiler {
  constructor(options) {
    this.options = options;

    this.context = this.options || process.cwd().replace(/\\/g, "/");

    this.hooks = {
      run: new SyncHook(),

      emit: new SyncHook(),

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
