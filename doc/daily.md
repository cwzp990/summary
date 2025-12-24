# 解决 Rsbuild 和 Vite 中 sass 编译 Element 字体图标乱码问题

记录下我猪哥遇到的坑

最近我猪哥在把项目从 Vue CLI 迁移到 Rsbuild 的时候，遇到一个很头疼的问题：[Element UI](https://github.com/ElemeFE/element) 的字体图标突然全都变成了乱码！

1.  将原本基于 Vue CLI 的项目迁移到 Rsbuild
2.  将 `sass` 编译器从 [node-sass](https://github.com/sass/node-sass) 替换为 [dart-sass](https://github.com/sass/dart-sass)
3.  编译 [Element UI](https://github.com/ElemeFE/element) 的样式文件时出现了字体图标乱码的问题

编译结果乱码（编辑器中显示成方块）

![编译结果乱码](https://camo.githubusercontent.com/1597f32a90a48d224a477cd76335087907e749ab1bc682f93f3513ed4a438eab/68747470733a2f2f69302e77702e636f6d2f6d616f6d616f313939362e6769746875622e696f2f6461696c792d6e6f7465732f7374617469632f35362f35362d312e706e67)

浏览器展示乱码（显示成方块或问号）

![浏览器展示乱码](https://camo.githubusercontent.com/f90472a3a34bf0beb93618acdd6a0fbc817f5bde07c6d28f0307c14b631d0076/68747470733a2f2f69302e77702e636f6d2f6d616f6d616f313939362e6769746875622e696f2f6461696c792d6e6f7465732f7374617469632f35362f35362d322e706e67)

## 解决方案：强制将 `content` 内容转为 `Unicode` 编码

经过深入研究（找了些资料）和测试（改了些代码），我们找到了解决方案：

在 `Sass` 编译后、`CSS` 输出前，对字体图标的 `content` 属性值进行 `Unicode` 编码转换

![转换编码](https://camo.githubusercontent.com/914506d2453fdf5aeb21bd7e439a47e2eccffab2f9a0169acb8c23eba3dc3774/68747470733a2f2f69302e77702e636f6d2f6d616f6d616f313939362e6769746875622e696f2f6461696c792d6e6f7465732f7374617469632f35362f35362d332e706e67)

### Vue CLI 配置

安装 `css-unicode-loader`

```js
    npm install --save-dev css-unicode-loader
```

配置 `vue.config.js`

```js
module.exports = {
  configureWebpack: (config) => {
    config.module.rules
      .filter((rule) => {
        return rule.test.toString().indexOf("scss") !== -1;
      })
      .forEach((rule) => {
        rule.oneOf.forEach((oneOfRule) => {
          oneOfRule.use.splice(
            oneOfRule.use.indexOf(require.resolve("sass-loader")),
            0,
            {
              loader: require.resolve("css-unicode-loader"),
            }
          );
        });
      });
  },
};
```

[[Bug Report] 使用 dart-sass 打包 element icon 出现乱码](https://github.com/ElemeFE/element/issues/21763)

### 编写 Rsbuild 自定义插件处理乱码

> 完整代码可在 [rsbuild.config.mjs](https://github.com/maomao1996/sass-element/blob/main/rsbuild.config.mjs) 中查看

```js
import path from "node:path";
import fs from "node:fs";
import { defineConfig } from "@rsbuild/core";
import { pluginVue2 } from "@rsbuild/plugin-vue2";

export default defineConfig({
  plugins: [pluginVue2()],
  tools: {
    rspack: {
      plugins: [
        {
          name: "rspack:content-unicode",
          apply(compiler) {
            compiler.hooks.afterEmit.tapPromise(
              "ContentUnicodePlugin",
              async (compilation) => {
                // 构建输出目录
                const distDir = compilation.outputOptions.path;
                // 获取所有资源列表
                const assets = compilation.getAssets();

                await Promise.all(
                  assets.map(async ({ name }) => {
                    if (!name.endsWith(".css")) return;

                    const filePath = path.join(distDir, name);
                    let css = await fs.promises.readFile(filePath, "utf-8");
                    css = css.replace(
                      /content:\s*(['"])(.*?)\1/g,
                      (match, quote, contentStr) => {
                        const encoded = [...contentStr]
                          .map((char) => {
                            const code = char.charCodeAt(0);
                            if (code > 255) {
                              // 小写 Unicode，并补齐到 4 位
                              return (
                                "\\" +
                                code.toString(16).toUpperCase().padStart(4, "0")
                              );
                            }
                            return char;
                          })
                          .join("");
                        return `content: ${quote}${encoded}${quote}`;
                      }
                    );
                    await fs.promises.writeFile(filePath, css, "utf-8");
                  })
                );
              }
            );
          },
        },
      ],
    },
  },
});
```

## Canvas 绘制带圆角的矩形图

### arcTo 方案

```js
// 绘制圆角矩形（使用 arcTo）
function drawRoundedRect(ctx, x, y, width, height, radius) {
  // 重置当前路径
  ctx.beginPath();

  // 移动到左上角
  ctx.moveTo(x + radius, y);
  // 绘制右上角
  ctx.arcTo(x + width, y, x + width, y + radius, radius);
  // 绘制右下角
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  // 绘制左下角
  ctx.arcTo(x, height, x, height - radius, radius);
  // 绘制左上角
  ctx.arcTo(x, y, x + radius, y, radius);

  // 填充当前路径
  ctx.fill();
}
```

### quadraticCurveTo 二次贝塞尔曲线方案

```js
// 绘制圆角矩形（使用二次贝塞尔曲线 quadraticCurveTo）
function drawRoundedRect(ctx, x, y, width, height, radius) {
  // 重置当前路径
  ctx.beginPath();

  // 移动到右上角
  ctx.moveTo(x + width - radius, y);
  // 绘制右上角曲线
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  // 绘制右边线
  ctx.lineTo(x + width, y + height - radius);
  // 绘制右下角曲线
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  // 绘制下边线
  ctx.lineTo(x + radius, y + height);
  // 绘制左下角曲线
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  // 绘制左边线
  ctx.lineTo(x, y + radius);
  // 绘制左上角曲线
  ctx.quadraticCurveTo(x, y, x + radius, y);
  // 绘制上边线（创建从当前点回到起始点的路径）
  ctx.closePath();

  // 填充当前路径
  ctx.fill();
}
```

### clip

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Canvas 绘制带圆角的矩形图 — clip</title>
  </head>
  <body>
    <div>
      <img
        id="img"
        src="https://mms1.baidu.com/it/u=181635795,1817021705&fm=253&app=138&f=JPEG&fmt=auto&q=75?w=500&h=284"
        alt=""
      />
    </div>
    <canvas id="canvas" width="500" height="284"></canvas>
    <script>
      // 绘制圆角矩形（使用 arcTo）
      function drawRoundedRect(ctx, x, y, width, height, radius) {
        // 保存当前环境的状态
        ctx.save()
        // 重置当前路径
        ctx.beginPath()

        // 移动到左上角
        ctx.moveTo(x + radius, y)
        // 绘制右上角
        ctx.arcTo(x + width, y, x + width, y + radius, radius)
        // 绘制右下角
        ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius)
        // 绘制左下角
        ctx.arcTo(x, height, x, height - radius, radius)
        // 绘制左上角
        ctx.arcTo(x, y, x + radius, y, radius)

        // 填充当前路径
        ctx.fill()
      }

      const img = document.getElementById('img')
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      window.onload = function () {
        const x = 0
        const y = 0
        const width = canvas.width
        const height = canvas.height

        let radius = 50

        // 处理圆角边界值
        radius = Math.min(radius, Math.min(width, height) / 2)

        // 绘制圆角矩形
        drawRoundedRect(ctx, x, y, width, height, radius)

        // 对矩形进行剪切
        ctx.clip()
        // 绘制图片
        ctx.drawImage(img, x, y, width, height)
      }
    </script>
  </body>
</html>
```

### globalCompositeOperation 方案

> globalCompositeOperation 可以设置要在绘制新形状时应用的合成操作的类型

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Canvas 绘制带圆角的矩形图 — globalCompositeOperation</title>
  </head>
  <body>
    <div>
      <img
        id="img"
        src="https://mms1.baidu.com/it/u=181635795,1817021705&fm=253&app=138&f=JPEG&fmt=auto&q=75?w=500&h=284"
        alt=""
      />
    </div>
    <canvas id="canvas" width="500" height="284"></canvas>
    <script>
      // 绘制圆角矩形（使用 arcTo）
      function drawRoundedRect(ctx, x, y, width, height, radius) {
        // 保存当前环境的状态
        ctx.save()
        // 重置当前路径
        ctx.beginPath()

        // 移动到左上角
        ctx.moveTo(x + radius, y)
        // 绘制右上角
        ctx.arcTo(x + width, y, x + width, y + radius, radius)
        // 绘制右下角
        ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius)
        // 绘制左下角
        ctx.arcTo(x, height, x, height - radius, radius)
        // 绘制左上角
        ctx.arcTo(x, y, x + radius, y, radius)

        // 填充当前路径
        ctx.fill()
      }

      const img = document.getElementById('img')
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      window.onload = function () {
        const x = 0
        const y = 0
        const width = canvas.width
        const height = canvas.height

        let radius = 600

        // 处理圆角边界值
        radius = Math.min(radius, Math.min(width, height) / 2)

        // 绘制圆角矩形
        drawRoundedRect(ctx, x, y, width, height, radius)
        // 只在新图形和目标画布重叠的地方绘制图形
        ctx.globalCompositeOperation = 'source-in'
        // 绘制图片
        ctx.drawImage(img, x, y, width, height)
      }
    </script>
  </body>
</html>
```
