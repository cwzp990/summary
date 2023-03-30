## TailwindCSS

TailwindCSS是POSTCSS的一个插件，他和bootstrap很像，但是bootstrap本身有巨大的限制，页面风格固定住了，而Tailwind是高度可定制化

- 不需要为了类名纠结

- CSS 的输出大小在可控范围内，项目到一定规模后大小几乎是不变的，因为类名高度复用

- 统一的行为和高度的自定义能力

- 能很容易地实现响应式设计和主题切换，例如暗黑模式

@apply 复用 extend扩展

theme 获取变量值 Sass、Less 和 Stylus 等预处理器在 Tailwind 之前单独运行

同样的CSS生成一份样式，减少打包后的样式大小

手机端优先 断点的含义是 大于等于

## TypeScript

### 类型变量定义

- `enum`：仅用来定义枚举类型；
- `interface`：可以用来定义函数、对象、类；
- `type`：使用绝大多数类型，例如普通的值、对象、函数、数组、元组(长度固定的数组)等。

> 类型是有父子关系的，子类型的值可以赋值给父类型，但是父类型的值是不能够赋值给子类型的

**1、具体值是基础类型的子类型**

**2、联合类型中的部分是整体的子类型**

**3、`never` 类型是所有类型的子类型**

### infer

infer 一定用在 extends 语句后表示待推断的类型

```ts
type Person = {
 name: string;
 age: number;
 id: number;
} 

// Pick 挑选出指定属性，生成新对象类型
type UserInfo = Pick<Person, 'name' | 'age'> // 挑选出 { name: string; age: number }

// Omit 排除指定的属性，生成新的对象类型
type UserInfo2 = Omit<Person, 'id'>; // 排除 id，生成  { name: string; age: number }

// Partial 将对象所有属性变为可选
type PartialPerson = Partial<Person>; // { name?: string; age?: number; id?: number }

// Readonly 将对象所有属性变为只读
type ReadonlyPerson = Readonly<Person>; // { readonly name: string; readonly age: number; readonly id: number }

// Record 生成对象类型，例如
type PersonMap = Record<number, Person>; // { [index: number]: Person }

// Exclude 排除一些联合类型
type UserInfoKeys = Exclude<keyof Person, 'id'>; // 'name' | 'age'
```

### 对象遍历

```ts
// js 对象遍历
const person = {
    name: '张三',
    age: 18,
    id: 1,
}

for (const key in person) {
    console.log(key, person[key]);
}

// ts 类型对象遍历
type Person = {
    name: string;
    age?: number;
    readonly id: number;
}

type Readonly<T> = {
    readonly [Key in keyof T]: T[Key];
}

```

**never 在联合类型中会被过滤掉：**

```ts
T | never // 结果为T
T & never // 结果为never
```

### is

**通常我们使用 is 关键字（类型谓词）在函数的返回值中，从而对于函数传入的参数进行类型保护**

```ts
interface TA {
  a: number
}

interface TB {
  b: number;
}

function cookTest(val: TA | TB) {
  if (val.a) { // error: Property 'a' does not exist on type 'TA | TB'.
  }
}

function getA(params: TA | TB): params is TA {
  return "a" in params;
}

function cookTest(val: TA | TB) {
  const a = getA(val) ? val.a : ''; // 安全
}
```

### interface type

- 同名 interface 自动聚合，也可以和已有的同名 class 聚合，适合做 polyfill

- 自身只能表示 object/class/function 的类型



- 表达功能更强大，不局限于 object/class/function

- 要扩展已有 type 需要创建新 type，不可以重名

- 支持更复杂的类型操作

## Webpack Vite

- **Loader 就是将 Webpack 不认识的内容转化为认识的内容**

- **插件（Plugin）可以贯穿 Webpack 打包的生命周期，执行不同的任务**
  
  - 将js、css自动引入到html 自动清空打包记录 分离样式文件

- 区分环境：cross-env

- babel/core babel/preset-env 中有一个usebuiltins 取代了es2015 es2016 es2017

```js
import React, { lazy, Suspense, useState } from 'react'
const LazyDemo = lazy(() => import('@/components/LazyDemo')) // 使用import语法配合react的Lazy动态引入资源
```

### Tree-shaking（标记清除算法）

利用 ES Module 静态导入的特点来检测模块内容的导出、导入以及被使用的情况

Rollup 消除项目中实际未使用的代码的过程

- 利用 **ES Module 可以进行静态分析**的特点来检测模块内容的导出、导入以及被使用的情况，保留 Live Code

- 消除**不会被执行**和**没有副作用（Side Effect）** 的 Dead Code，即 DCE 过程

### HMR

#### webpack

在不需要刷新整个页面的同时更新模块，能够提升开发的效率和体验。热更新时只会局部刷新页面上发生了变化的模块，同时可以保留当前页面的状态

热更新的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上`webpack-dev-server`与浏览器之间维护了一个`websocket`，当本地资源发生变化时，`webpack-dev-server`会向浏览器推送更新，并带上构建时的`hash`，让客户端与上一次资源进行对比。客户端对比出差异后会向`webpack-dev-server`发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向`webpack-dev-server`发起 jsonp 请求获取该`chunk`的增量更新。

后续的部分(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？)由`HotModulePlugin` 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像`react-hot-loader`和`vue-loader`都是借助这些 API 实现热更新

#### vite

开发阶段，会创建一个Koa实例，创建除了node_modules之外的文件的watcher，并传入context中，将context上下文传入并调用每一个plugin

- 向index.html中注入hmr模块导入

- 拦截es module请求

- 读取client.js文件并返回给浏览器

- 建立socket连接，定义send方法并赋值给watch.send

- 通过watch监听文件改变

- Vue文件发生改变，调用send方法，通过socket给客户端推送修改的文件信息

- 客户端接收推送修改的文件信息，导入对应文件

##### 循环引用的问题

CommonJS一个模块就是一个脚本文件，CommonJs模块无论加载多少次，只会在第一次加载时运行一次，以后再次加载，就返回第一次的运行结果

ESModule a中引入b，会去优先执行b，然后执行a，然后发现b中引入a，此时不会去执行a，而是认为这个接口已经存在，继续向下执行，foo发现不存在foo is not defined

![](/Users/aa/Library/Application%20Support/marktext/images/2023-03-30-14-40-12-image.png)

### 性能优化相关

- 代码压缩

- 多进程打包

- 缓存

- 拆包chunk
  
  - 应用代码和第三方代码打包为单独的chunk
  
  - 动态import的代码会被分割成单独的chunk

- 代码懒加载

- 资源预加载

- 提取公共代码

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f08957efc1d4c6fb9ee851427167f95~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## CI/CD（流水线、nginx）

**即每当我们将前端代码更新并 PUSH 到仓库后，CICD 将会拉取仓库代码并自动部署到服务器**

## npm相关（调试、发布、npm字段），monorepo架构

node_modules/.bin/ 里会创建可执行文件 这是一个软连接

```bash
#!/bin/sh
```

在 npm install 时，npm 读到该配置后，就将该文件软链接到 ./node_modules/.bin 目录下，而 npm 还会自动把node_modules/.bin加入$PATH，这样就可以直接作为命令运行依赖程序和开发依赖程序，不用全局安装了

```json
{
    "bin": {
        "vue-cli-service": "bin/vue-cli-service.js"
    },
} 
```

- 运行 npm run xxx的时候，npm 会先在当前目录的 node_modules/.bin 查找要执行的程序，如果找到则运行；
- 没有找到则从全局的 node_modules/.bin 中查找，npm i -g xxx就是安装到到全局目录；
- 如果全局目录还是没找到，那么就从 path 环境变量中查找有没有其他同名的可执行程序

npm script hook preXXX postXXX

修改版本号npm version patch/minor/major

npm publish之前有npm prepare 打包

```json
{
    "private": true, // 私有
    "main": "index.js", // 入口文件
    "files": ["dist"] // 实际要发送的包内容
} 
```

### pnpm

之前下载的node包会放在一个固定目录 另外工程将不会下载，通过软链接连接

依赖隔离，间接依赖放在.pnpm 名称+版本号

### monorepo

- 复制粘贴

- npm i

- pnpm monorepo

### lerna

```json
{
    "workspaces": [
        "packages/*"
    ]
}
```

## Git Eslint Husky

## 微前端

qiankun会用原生fetch方法，请求微应用的entry获取微应用资源，然后通过response.text把获取内容转为字符串。

将HTML字符串传入processTpl函数，进行HTML模板解析，通过正则匹配HTML中对应的javaScript（内联、外联）、css（内联、外联）、代码注释、entry、ignore收集并替换，去除html/head/body等标签，其他资源保持原样

将收集的styles外链URL对象通过fetch获取css，并将css内容以<style>的方式替换到原来link标签的位置

收集script外链对象，对于异步执行的JavaScript资源会打上async标识，会使用requestIdleCallback方法延迟执行。

接下来会创建一个匿名自执行函数包裹住获取到的js字符串，最后通过eval去创建一个执行上下文执行js代码，通过传入proxy改变window指向，完成JavaScript沙箱隔离。

由于qiankun是自执行函数执行微应用的JavaScript，因此在加载后的微应用中是看不到JavaScript资源引用的，只有一个资源被执行替换的标识。

当一切准备就绪的时候，执行微应用的JavaScript代码，渲染出微应用

#### 构建主应用

1. 创建微应用容器 - 用于承载微应用，渲染显示微应用；
2. 注册微应用 - 设置微应用激活条件，微应用地址等等；
3. 启动`qiankun`；

构建好主框架后，我们需要使用`qiankun`的`registerMicroApps`方法注册微应用，代码实现如下： 首先主应用安装`qiankun`

#### 构建子应用

1. 导出相应的生命周期钩子；
   
   微应用需要在自己的入口文件，添加bootstrap、mount、unmount三个生命周期钩
   
   子，供主应用在适当的时机调用
2. 配置微应用的打包工具

webpack配置

```js
output: {
          // 微应用的包名，这里与主应用中注册的微应用名称一致
          library: `${packageName}-[name]`,
          // 将你的 library 暴露为所有的模块定义下都可运行的方式
          libraryTarget: "umd",
          // 按需加载相关，设置为 webpackJsonp_VueMicroApp 即可
          jsonpFunction: `webpackJsonp_${packageName}`,
      },
```

#### 应用划分

在开始介绍 `qiankun` 的应用通信之前，我们需要先了解微前端架构如何划分子应用。 在微前端架构中，我们应该按业务划分出对应的子应用，而不是通过功能模块划分子应用。这么做的原因有两个：

1. 在微前端架构中，子应用并不是一个模块，而是一个独立的应用，我们将子应用按业务划分可以拥有更好的可维护性和解耦性。
2. 子应用应该具备独立运行的能力，应用间频繁的通信会增加应用的复杂度和耦合度。 综上所述，我们应该从业务的角度出发划分各个子应用，尽可能减少应用间的通信，从而简化整个应用，使得我们的微前端架构可以更加灵活可控。
