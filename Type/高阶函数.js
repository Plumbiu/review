// function core(...args) {
//   console.log(`core code ${args}`)
// }

// Function.prototype.before = function(cb) { // 参数为函数
//   return (...args) => { // 返回一个函数
//     cb()
//     // core(...args)
//     this(...args)
//   }
// }
// let newCore = core.before(function() {
//   console.log('before')
// })
// // 对原来的方法进行了扩展
// newCore(1, 2, 3)

// // 判断类型常见的4种方式
// // typeof：可以判断基本类型，但是不能判断引用类型，例如 typeof null === 'object
// // instanceof 可以判断某个类型是否属于谁
// // Object.prototype.toString 需要在对象的原型中找到方法
// // constructor
// // [].constructor === Array
// // {}.constructor === Object
// function isType(typing) {
//   return function(val) {
//     return Object.prototype.toString.call(val) === `[object ${typing}]`
//   }
// }

// let utils = {}
// let typeArr = ['Number', 'Boolean', 'String', 'Null', 'Undefined', 'Object', 'Array', 'Function', 'Symbol']
// typeArr.forEach(type => {
//   utils[`is${type}`] = isType(type)
// })
// console.log(utils.isNumber(123))
// console.log(utils.isFunction(function() {
//   console.log('hello')
// }))
// console.log(utils.isSymbol(Symbol('hello')))

// let obj = {

// }

// // function cb(key, value) {
// //   obj[key] = value
// //   if(Reflect.ownKeys(obj).length === 2) {
// //     console.log(obj)
// //   }
// // }

// function after(times, cb) {
//   let obj = {}
//   return (key, value) => {
//     obj[key] = value
//     if(--times === 0) {
//       cb(obj)
//     }
//   }
// }

// let cb = after(2, (data) => {
//   console.log(data)
// })
// const fs = require('fs')
// const path = require('path')
// // fs.readFile 默认 path.resolve() 会根据执行的路径来解析结对路径
// // node 中的异步 api庙会掉的第一个参数都是 err
// fs.readFile(path.resolve(__dirname, 'a.txt'), 'utf-8', (err, data) => {
//   obj.msg = data
//   cb('msg', data)
// })
// fs.readFile(path.resolve(__dirname, 'b.txt'), 'utf-8', (err, data) => {
//   obj.age = data
//   cb('age', data)
// })

// // 发布订阅

// let events = {
//   _obj: {},
//   _attr: [],
//   on(cb) {
//     this._attr.push(cb)
//   },
//   emit(key, value) {
//     this._obj[key] = value
//     this._attr.forEach(cb => cb(this._obj))
//   }
// }
// events.on(() => {
//   console.log('读取完后触发')
// })
// events.on(data => {
//   if(Reflect.ownKeys(data).length === 2) {
//     console.log('数据读取完毕', data)
//   }
// })
// fs.readFile(path.resolve(__dirname, 'a.txt'), 'utf-8', (err, data) => {
//   events.emit('msg', data)
// })
// fs.readFile(path.resolve(__dirname, 'b.txt'), 'utf-8', (err, data) => {
//   events.emit('age', data)
// })

// 被观察者类
class Subject {
  constructor(name) {
    this.name = name
    this._attr = []
  	this.state = '初始的状态'
  }
  // 被观察者绑定观察者，observer 为观察者类的实例
  attach(observer) {
    this._attr.push(observer)
  }
  // 为被观察者设置新的状态
  setState(newState) {
    this.state = newState
    // 设置新的状态，触发观察者的 update 方法，并将被观察者实例传入
    this._attr.forEach(observer => observer.update(this))
  }
}
// 观察者类
class Observer {
  constructor(name) {
    this.name = name
  }
  update(subject) {
    console.log(`${this.name}: ${subject.name}-${subject.state}`)
  }
}
let s = new Subject('被观察者')
let o1 = new Observer('观察者1')
let o2 = new Observer('观察者2')
s.attach(o1)
s.attach(o2)
s.setState('新的状态')


