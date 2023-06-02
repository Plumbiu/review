const s = Symbol('title')
const m = new Map([
  ['name', 'John'],
  [s, 'hello world']
])
console.log(m) // Map(2) { 'name' => 'John', 'age' => 30 }
console.log(m.size) // 2
console.log(m.get('name')) // "John"
console.log(m.get(s)) // "hello world"

const m1 = new Map([
  ['foo', 'bar'],
  ['baz', 42]
])
console.log(m1.size) // 2

const m2 = new Map()
m2.set('foo', 'bar')
m2.set(1, 'hello')
m2.set(undefined, 'world')
m2.set(Symbol('bar'), 'baz')
console.log(m2) 
// Map(4) {
//   'foo' => 'bar',
//   1 => 'hello',
//   undefined => 'world',
//   Symbol(bar) => 'baz'
// }
m2.set('1', 1).set('2', 2).set('3', 3)

const m3 = new Map([
  ['foo', 'bar'],
  ['baz', 42],
])
console.log(m3.get('foo')) // "bar"
console.log(m3.get('baz')) // 42
console.log(m3.get('hello')) // undefined

console.log(m3.has('foo')) // true
console.log(m3.has('hello')) // false

const m4 = new Map([
  ['foo', 'bar'],
  ['baz', 42],
])
console.log(m4.delete('foo')) // true
console.log(m4.delete('hello')) // false

m4.clear()
console.log(m4) // Map(0) {}

let m5 = new Map([
  ['F', 'no'],
  ['T', 'yes']
])
// "F"
// "T"
for(let key of m5.keys()) {
  console.log(key)
}
// "no"
// "yes"
for(let value of m5.values()) {
  console.log(value)
}
// F => no
// T => yes
for(let [key, value] of m5.entries()) {
  console.log(`${key} => ${value}`)
}
// F => no
// T => yes
console.log(m5[Symbol.iterator] === m5.entries) // true
for(let [key, value] of m5) {
  console.log(`${key} => ${value}`)
}
// F => no
// T => yes

const m6 = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three']
])
console.log([...m6.keys()]) // [ 1, 2, 3 ]
console.log([...m6.values()]) // [ 'one', 'two', 'three' ]
console.log([...m6.entries()]) // [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]
console.log([...m6]) // [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]

function map2obj(map) {
  let obj = {}
  for(let [k, v] of map) {
    obj[k] = v
  }
  return obj
}
const m7 = new Map([
  ['yes', true],
  ['no', false]
])
console.log(map2obj(m7)) // { yes: true, no: false }

function obj2map(obj) {
  let map = new Map()
  for(let [key, value] of Object.entries(obj)) {
    map.set(key, value)
  }
  return map
}
const obj1 = {
  yes: true,
  no: false
}
console.log(obj2map(obj1)) // Map(2) { 'yes' => true, 'no' => false }

const e1 = document.getElementById('foo')
const e2 = document.getElementById('bar')
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素']
]
arr[0] = null
arr[1] = null