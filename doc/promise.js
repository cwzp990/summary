//定义三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function myPromise (executor) {
  let that = this
  that.status = PENDING
  that.value = null
  that.error = null
  that.onFulfilledCB = []
  that.onRejectedCB = []

  function resolve (value) {
    if (that.status !== PENDING) return
    that.value = value
    that.status = FULFILLED
    that.onFulfilledCB.forEach(fn => fn(value));
  }

  function reject (error) {
    if (that.status !== PENDING) return
    that.error = error
    that.status = REJECTED
    that.onRejectedCB.forEach(fn => fn(error))
  }

  executor(resolve, reject) // promise实例化立即执行
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  let bridgePromise
  // 如果promise里是异步操作，即状态还没发生改变
  if (that.status === PENDING) {
    return bridgePromise = new myPromise((resolve, reject) => {
      if (typeof onFulfilled === 'function') {
        that.onFulfilledCB.push(value => {
          try {
            let x = onFulfilled(value)
            resolvePromise(bridgePromise, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }
      if (typeof onRejected === 'function') {
        that.onRejectedCB.push(error => {
          try {
            let x = onRejected(error)
            resolve(bridgePromise, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }
    })
  }
  // 当promise状态发生了改变，不论成功失败都会调用then方法
  if (that.status === FULFILLED) {
    if (typeof onFulfilled === 'function') {
      return bridgePromise = new myPromise((resolve, reject) => {
        try {
          let x = onFulfilled(that.value)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    }
  }
  if (that.status === REJECTED) {
    if (typeof onRejected === 'function') {
      return bridgePromise = new myPromise((resolve, reject) => {
        try {
          let x = onRejected(that.error)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    }
  }

  return bridgePromise
};

myPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

function resolvePromise (bridgePromise, x, resolve, reject) {
  // 如果x是一个promise，需要拆解到他不是为止
  if (x instanceof myPromise) {
    if (x.status === PENDING) {
      x.then(y => {
        resolvePromise(bridgePromise, y, resolve, reject)
      }, error => {
        reject(error)
      })
    } else {
      x.then(resolve, reject)
    }
  } else {
    resolve(x)
  }
}
