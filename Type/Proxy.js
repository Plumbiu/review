let obj = {
  foo: 'bar',
  baz: 42,
  hello: 'world'
}
let p = new Proxy(obj, {
  get(target, key) {
    return `get: ${target[key]}`
  },
  set(target, key, value) {
    target[key] = `set: ${value}`
  }
})
console.log(p.foo) // get: bar
console.log(p.baz) // get: 42
console.log(p.hello) // get: world
p.foo = 'a'
console.log(p.foo) // get: set: a
p.baz = 'b'
console.log(p.baz) // get: set: b
p.hello = 'c'
console.log(p.hello) // get: set: c
console.log(obj.foo) // "set: a"
console.log(obj) // { foo: 'set: a', baz: 'set: b', hello: 'set: c' }

let f = new Proxy(function() {
  return 'hello world'
}, {})
console.log(f()) // hello world
let obj1 = {
  name: 'plumbiu'
}
let p1 = new Proxy(obj1, {
  get(target, key) {
    if(Object.keys(obj1).includes(key)) {
      return `get: ${target[key]}`
    } else {
      throw new ReferenceError(`Prop name ${key} does not exist.`)
    }
  }
})
console.log(p1.name) // "get: plumbiu"
// console.log(p1.age) // ReferenceError: Prop name age does not exist.

let p2 = new Proxy({}, {
  get(target, key) {
    return `get: ${key}`
  }
})
let p3 = Object.create(p2)
console.log(obj.foo) // "set: a"

let p4 = new Proxy({
  name: 'plumbiu'
}, {
  set(target, key, value) {
    target[key] = `set: ${value}`
  }
})
console.log(p4.name) // "plumbiu"
p4.name = 'brickle'
console.log(p4.name) // "set: brickle"

let f1 = function() {
  return 'target'
}
let p5 = new Proxy(f1, {
  apply(target, ctx, args) {
    return 'proxy'
  }
})
console.log(p5()) // "proxy"

const obj2 = {
  _name: 'plumbiu',
  name: 'brickle'
}
// Object.preventExtensions(obj2)
const p6 = new Proxy(obj2, {
  has(target, key) {
    if(key[0] === '_') {
      return false
    }
    return key in target
  }
})
console.log('_name' in p6) // false
console.log('name' in p6) // true

const p7 = new Proxy(function() {}, {
  construct(target, args) {
    return {
      value: 'hello world'
    }
  }
})
console.log((new p7()).value) // "hello world"

const p8 = new Proxy(function() {}, {
  construct() {
    return 1
  }
})
// new p8() // TypeError: 'construct' on proxy: trap returned non-object ('1')

const p9 = new Proxy({}, {
  construct() {
    return {
      value: 1
    }
  }
})
// new p9() // TypeError: 'construct' on proxy: trap returned non-object ('1')

let obj3 = {
  _prop: 'foo',
  prop: 'bar'
}
const p10 = new Proxy(obj3, {
  deleteProperty(target, key) {
    if(key[0] === '_') {
      throw new Error(`Invalid attempt to delete private "${key}" property`)
    }
    return true
  }
})
console.log(delete p10.prop) // true
// console.log(delete p10._prop) // Error: Invalid attempt to delete private "_prop" property

const p11 = new Proxy({}, {
  defineProperty(target, key, descriptor) {
    return false
  }
})
p11.foo = 'bar'
console.log(p11) // {}
