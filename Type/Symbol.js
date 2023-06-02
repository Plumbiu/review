let s = Symbol()
console.log(typeof s)

let s1 = Symbol('foo') // Symbol(foo)
let s2 = Symbol('bar') // Symbol(bar)
console.log(s1)
console.log(s2)
console.log(s1.toString()) // "Symbol(foo)"
console.log(s2.toString()) // "Symbol(bar)"

const obj = {
  toString() {
    return 'abc'
  }
}
const s3 = Symbol(obj)
console.log(s3) // Symbol(abc)

let s4 = Symbol()
let s5 = Symbol()
console.log(s4 === s5)
let s6 = Symbol('foo')
let s7 = Symbol('foo')
console.log(s6 === s7)

let s8 = Symbol('world')
// let str1 = 'hello ' + s8 // TypeError: Cannot convert a Symbol value to a string
// let str2 = `hello ${s8}` // TypeError: Cannot convert a Symbol value to a string
let str3 = `hello ${String(s8)}`
console.log(str3) // "hello Symbol(world)"
console.log(Boolean(s8)) // true
console.log(!s8) // false
// console.log(Number(s8)) // TypeError: Cannot convert a Symbol value to a number

let s9 = Symbol('foo')
console.log(s9.description) // "foo"

let abc = {}
let key = 'bar'
abc[key] = '123' // 等同于 abc['bar]
console.log(abc.bar) // "123"

let s10 = Symbol('foo')
abc[s10] = '456'
console.log(abc[s10]) // "456"
console.log(abc['foo']) // undefined

let s11 = Symbol('foo')
const obj1 = {
  [s11]: 'hello',
  's11': 'world'
}
console.log(obj1[s11]) // "hello"
console.log(obj1.s11) // "world"

let obj2 = {
  [Symbol('a')]: 'Hello',
  [Symbol('b')]: 'World',
  foo: 'bar'
}
const symbols1 = Object.getOwnPropertySymbols(obj2)
const symbols2 = Object.getOwnPropertyNames(obj2)
const symbols3 = Object.keys(obj2)
for(let key in obj2) {
  console.log(key, obj2[key]) // "foo" "bar"
}
for(let [key, value] of Object.entries(obj2)) {
  console.log(key, value) // "foo" "bar"
}
console.log(symbols1) // [ Symbol(a), Symbol(b) ]
console.log(symbols2) // [ 'foo' ]
console.log(symbols3) // [ 'foo' ]
console.log(JSON.stringify(obj2)) // {"foo":"bar"}
console.log(Reflect.ownKeys(obj2)) // [ 'foo', Symbol(a), Symbol(b) ]

let s12 = Symbol.for('foo')
let s13 = Symbol.for('foo')
console.log(s12 === s13) // true

let s14 = Symbol.for('foo')
let s15 = Symbol('foo')
console.log(Symbol.keyFor(s14)) // "foo"
console.log(Symbol.keyFor(s15)) // undefined

function foo() {
  return Symbol.for('key')
}
let s16 = foo()
let s17 = Symbol.for('key')
console.log(s16 === s17) // true