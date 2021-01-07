// 发布订阅模式
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