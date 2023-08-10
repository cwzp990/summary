const { SyncHook } = require("tapable");
const Compilation = require("./compilation");
const fs = require("fs-extra");
const path = require("path");

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

    // 生成产物
    compilation.seal();

    // 输出产物
    this.emitAssets(compilation, cb)
  }

  emit(compilation, cb) {}

  emitAssets(compilation, cb) {
    const { entries, modules, chunks, assets } = compilation
    const output = this.options.output

    this.hooks.emit.call()

    if (!fs.existsSync(output.path)) {
      fs.mkdirSync(output.path)
    }

    // 将assets内容写入文件系统中
    Object.keys(assets).forEach(filename => {
      const filepath = path.join(output.path, filename)
      const content = assets[filename]

      fs.writeFileSync(filepath, content, 'utf-8')
    })

    this.hooks.done.call()

    cb && cb(null, {
      toJSON: () => {
        entries,
        modules,
        chunks,
        assets
      }
    })
  }
}

module.exports = Compiler;
