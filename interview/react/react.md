## jsx本质是什么
jsx是JavaScript的扩展，他会编译为react.createElement()，并将返回一个叫做react element的JS对象

## 虚拟DOM是什么
虚拟DOM本质是以JavaScript对象形式存在的对DOM的描述

虚拟DOM的好处：

## 生命周期

### react15的生命周期

![lifecycle](./lifecycle_15.png)

如果父组件导致组件重新渲染，即使props没有更改，也会调用componentReceiveProps方法。即**componentReceiveProps 并不是由 props 的变化触发的，而是由父组件的更新触发的**

### react16的生命周期

![lifecycle](./lifecycle_16.png)

getDerivedStateFromProps 在此方法里是访问不到this的因为他是个静态的方法，两个参数props和state，分别代表当前组件接收到来自父组件的props和当前组件自身的state，且需要一个对象的返回值来更新组件的state

getSnapshotBeforeUpdate的返回值作为第三个参数给到componentDidUpdate，它的执行时机是render方法之后，真实DOM更新之前，此时，我们可以同时获取到更新前的真实DOM和更新前后的state / props信息

### Fiber架构
react渲染由原来的同步渲染变为可以被打断的异步渲染，即render阶段是允许暂停、终止和重启的，就会导致render阶段的生命周期都是有可能被重复执行的：componentWillMount、componentWillUpdate、componentWillReceiveProps

### 发布订阅模式

```js

class myEventEmitter {
  constructor () {
    this.eventMap = {}
  }

  on(type, handler) {
    if (!handler instanceof Function) {
      throw new Error("请传入一个函数~")
    }

    if (!this.eventMap[type]) {
      this.eventMap[type] = []
    }

    this.eventMap[type].push(handler)
  }

  emit(type, params) {
    if (this.eventMap[type]) {
      this.eventMap[type].forEach((handler, index) => {
        handler(params)
      })
    }
  }

  off(type, handler) {
    if (this.eventMap[type]) {
      this.eventMap[type].splice(this.eventMap[type].indexOf(handler)>>>0, 1)
    }
  }
}

const myEvent = new myEventHandler()
const testHandler = function (params) {
  console.log(`事件触发，参数是${params}`)
}
myEvent.on("test", testHandler)
myEvent.emit("test", "newState")

// 通信
const globalEvent = window.myEvent

class B extends React.Component {
  state = {
    params: ''
  }
  handler = (params) => {
    this.setState({
      params
    })
  }
  bindHandler = () => {
    globalEvent.on("someEvent", this.handler)
  }
}

class A extends React.Component {
  state = {
    infoToB: ''
  }
  reportToB = () => {
    globalEvent.emit("someEvent", this.state.infoToB)
  }
}

```

