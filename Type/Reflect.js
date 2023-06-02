let obj1 = {}
Object.preventExtensions(obj1)
try {
  Object.defineProperty(obj1, 'baz', { value: 44 })
} catch(err) {
  console.log(err.message) // Cannot define property baz, object is not extensible
}

if(Reflect.defineProperty(obj1, 'baz', { value: 42 })) {
  console.log(obj1.baz)
} else {
  console.log('error!') // error!
}

let obj2 = {
  name: 'plumbiu'
}
// 老写法
console.log('name' in obj2) // true
// 新写法
console.log(Reflect.has(obj2, 'name')) // true

let obj3 = {
  foo: 'bar'
}
let p1 = new Proxy(obj3, {
  set(target, key, value) {
    let success = Reflect.set(target, key, value)
    if(success) {
      console.log(`property ${key} on obj3 set to ${value}`)
    }
    return success
  }
})
console.log(p1.foo = 'baz')


console.log(Function.prototype.apply.call(Math.floor, undefined, [1.75])) // 1
console.log(Reflect.apply(Math.floor, undefined, [1.75])) // 1

let obj4 = {
  foo: 'bar',
  baz: 42
}
console.log(Reflect.get(obj4, 'foo')) // bar
console.log(Reflect.get(obj4, 'baz')) // 42
console.log(Reflect.get(obj4, 'name')) // undefined

// Reflect.get(1, 'foo') // TypeError: Reflect.get called on non-object

let obj5 = {
  foo: 'bar',
  baz: 1,
  get fn() {
    return this.baz + 5
  }
}
let obj6 = {
  baz: 0
}
console.log(obj5.fn) // 6
console.log(Reflect.get(obj5, 'fn')) // 6
console.log(Reflect.get(obj5, 'fn', obj6)) // 5

let obj7 = {
  foo: 'bar'
}
console.log(obj7.foo) // "bar"
Reflect.set(obj7, 'foo', 'barbar')
console.log(obj7.foo) // "barbar"

let obj8 = {
  baz: 1,
  set fn(value) {
    this.baz = value
  }
}
let obj9 = {
  baz: 0
}
Reflect.set(obj8, 'bar', 1, obj9)
console.log(obj8.baz) // 1
console.log(obj9.baz) // 0

let obj10 = {
  foo: 'bar'
}
let p2 = new Proxy(obj10, {
  set(target, key, value, receiver) {
    console.log('set')
    Reflect.set(target, key, value, receiver)
  },
  defineProperty(target, key, attr) {
    console.log('defineProperty')
    Reflect.defineProperty(target, key, attr)
  }
})
p2.foo = 'barbar'
// "set"
// "defineProperty"

let obj11 = {
  foo: 'bar'
}
console.log('foo' in obj11) // true
console.log(Reflect.has(obj11, 'foo')) // true

let obj12 = {
  foo: 'bar',
  baz: 42
}
// 旧写法
delete obj12.foo
console.log(obj12) // { baz: 42 }
// 新写法
Reflect.deleteProperty(obj12, 'baz')
console.log(obj12) // {}

function Greeting(name, age) {
  this.name = name
  this.age = age
}
const instance1 = new Greeting('plumbiu', 20)
console.log(instance1) // Greeting { name: 'plumbiu', age: 20 }
const instance2 = Reflect.construct(Greeting, ['brickle', 19])
console.log(instance2) // Greeting { name: 'brickle', age: 19 }

const arr = [1, 2, 3, 4, 5, 6]
// 旧写法
const min1 = Math.min.apply(Math, arr)
console.log(min1) // 1
// 新写法
const min2 = Reflect.apply(Math.min, Math, arr)
console.log(min2) // 1

function nowTime() {

}

Object.defineProperty(nowTime, 'now',  {
  value: () => Date.now()
})
console.log(nowTime.now()) // 1680695227921
Reflect.defineProperty(nowTime, 'after', {
  value: () => Date.now() + 10
})
console.log(nowTime.after()) // 1680695227931

let obj13 = {
  foo: 'bar'
}
console.log(Object.getOwnPropertyDescriptor(obj13, 'foo'))
// { value: 'bar', writable: true, enumerable: true, configurable: true }
console.log(Reflect.getOwnPropertyDescriptor(obj13, 'foo'))
// { value: 'bar', writable: true, enumerable: true, configurable: true }

let obj14 = {}
console.log(Object.isExtensible(obj14)) // true
console.log(Reflect.isExtensible(obj14)) // true
Reflect.preventExtensions(obj14)
console.log(Object.isExtensible(obj14)) // false
console.log(Reflect.isExtensible(obj14)) // false

console.log(Object.isExtensible(1)) // false
// console.log(Reflect.isExtensible(1)) // TypeError: Reflect.isExtensible called on non-object

let obj15 = {}
console.log(Object.preventExtensions(obj15)) // {}
console.log(Reflect.preventExtensions(obj15)) // true

console.log(Object.preventExtensions(1)) // 1
// console.log(Reflect.preventExtensions(1)) // TypeError: Reflect.preventExtensions called on non-object

let obj16 = {
  foo: 'bar',
  baz: 42,
  [Symbol('foofoo')]: 'barbar',
  [Symbol('bazbaz')]: 4242
}
console.log([...Object.getOwnPropertyNames(obj16), ...Object.getOwnPropertySymbols(obj16)])
// [ 'foo', 'baz', Symbol(foofoo), Symbol(bazbaz) ]
console.log(Reflect.ownKeys(obj16))
// [ 'foo', 'baz', Symbol(foofoo), Symbol(bazbaz) ]

function myFn() {}
const obj17 = new myFn()
console.log(Object.getPrototypeOf(obj17) === myFn.prototype) // true
console.log(Reflect.getPrototypeOf(obj17) === myFn.prototype) // true

console.log(Object.getPrototypeOf(12)) // {}
// console.log(Reflect.getPrototypeOf(1)) // TypeError: Reflect.getPrototypeOf called on non-object

const obj18 = {}
console.log(Object.setPrototypeOf(obj18, {
  len: 1
})) // {}
console.log(obj18.len) // 1
console.log(Reflect.setPrototypeOf(obj18, {
  lens: 2
})) // true
console.log(obj18.lens) // 2

console.log(Object.setPrototypeOf(1, {})) // 1
console.log(Reflect.setPrototypeOf(1, {})) // TypeError: Reflect.setPrototypeOf called on non-object


console.log()(Object.setPrototypeOf(null, {})) // TypeError: Object.setPrototypeOf called on null or undefined
console.log()(Reflect.setPrototypeOf(null, {})) // TypeError: Reflect.setPrototypeOf called on non-object