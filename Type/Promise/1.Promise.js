// 为了方便测试，我们把Promise放在一个文件中
function resolvePromise(p, x, resolve, reject) {
  // 如果 x 和 p 引用同一个对象，那么 reject 一个 TypeError
  if (x === p) return reject(new TypeError('循环引用'))
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // 有可能是 promise
    // x 可能是一个 promise
    let called = false
    try {
      let then = x.then // then 方法可能是通过 defineProperty 定义的
      if (typeof then === 'function') {
        // 是 promise，则 then 应该是个函数
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolve(y)
          },
          r => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        // 就是一个对象或者函数
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }
  } else {

    resolve(x) // 普通值
  }
}

class Promise {
  constructor(executor) {
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    const resolve = value => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = value
        this.onResolvedCallbacks.forEach(cb => cb())
      }
    }
    const reject = reason => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(cb => cb())
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }
    let p = new Promise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(p, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      } else if (this.status === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(p, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      } else if (this.status === 'pending') {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              console.log(x)
              resolvePromise(p, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(p, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          })
        })
      }
    })
    return p
  }
}

module.exports = Promise
