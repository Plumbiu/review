// 1. promise 是一个构造函数，默认需要传入一个 executor 执行器
// 2. executor 执行器会立即执行，并且传入 resolve 和 reject 两个函数
// 3. promise 有三个状态 pending(等待), fulfilled(成功), rejected(失败)
// 4. promise 都有一个 then 方法，可以访问成功和失败的原因
// 5. promise 可以通过 resolve 和 reject 来改变状态，同时调用对应的回调，一个 promise 实例状态变化后，不能重新的发生变化
// 6.当 exector 发生异常时，也会触发 promise 的失败
const fs = require('fs')
const path = require('path')
const Promise = require('./1.Promise')
// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('ok')
//   }, 1000)
// })
// p.then(
//   data => {
//     console.log(data, '-> success')
//   },
//   err => {
//     console.log(err, '-> err')
//   }
// )

// p.then(
//   data => {
//     console.log(data, '-> success2')
//   },
//   err => {
//     console.log(err, '-> err')
//   }
// )

// function promisify(fn) {
//   return function (...args) {
//     let promise = new Promise((resolve, reject) => {
//       fn(...args, (err, data) => {
//         if (err) return reject(err)
//         resolve(data)
//       })
//     })
//     return promise
//   }
// }

// let readFile = promisify(fs.readFile)

// readFile(path.resolve(__dirname, 'a.txt'), 'utf-8')
//   .then(data => {
//     return readFile(data, 'utf-8')
//   })
//   .then(
//     data => {
//       console.log(data)
//     },
//     err => {
//       console.log(err)
//     }
//   )
let p = new Promise((resolve, reject) => {
  reject('ok')
})

let p2 = p.then(null, )
p2.then((data) => {
  console.log(data, '-> success')
}, err => {
  console.lo
  +
  
  
  
  g(err, '-> error')
})