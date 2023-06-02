let a = [1, 1, 2, 2, 3, 3, 'a', 'b', 'a', 'c', 'b']
console.log(new Set(a)) // Set(6) { 1, 2, 3, 'a', 'b', 'c' }
console.log([...new Set(a)]) // [ 1, 2, 3, 'a', 'b', 'c' ]

let s1 = new Set([1, 1, 2, 2, 'a', 'a', 'b'])
console.log(s1.size) // 4

console.log([...new Set('hello world')].join('')) // helo wrd

console.log(NaN === NaN) // false
console.log([...new Set([NaN, NaN])]) // [ NaN ]

let set = new Set()
set.add({})
console.log(set) // Set(1) { {} }
set.add({})
console.log(set) // Set(2) { {}, {} }

console.log({} === {}) // false
console.log(JSON.stringify({}) === JSON.stringify({})) // true

let a2 = [1, 1, 2, 2, 3, 3, 'a', 'b', 'a', 'c', 'b']
let s2 = new Set()
a2.forEach(x => s2.add(x))
console.log([...s2]) // [ 1, 2, 3, 'a', 'b', 'c' ]

let s3 = new Set()
console.log(s3.add(1))

let s4 = new Set([1, 1, 2, 3, 3, 'a', 'a', 'b'])
console.log([...s4]) // [ 1, 2, 3, 'a', 'b' ]
s4.delete('a')
console.log([...s4]) // [ 1, 2, 3, 'b' ]
console.log(s4.delete('a')) // false

let s5 = new Set([1, 1, 2, 3, 3, 'a', 'a', 'b'])
console.log(s5.has(1)) // true
console.log(s5.has(5)) // false

let s6 = new Set([1, 1, 2, 3, 3, 'a', 'a', 'b'])
console.log(s6) // Set(5) { 1, 2, 3, 'a', 'b' }
s6.clear()
console.log(s6) // Set(0) {}

let s7 = new Set([1, 1, 2, 2, 3, 4, 5])
console.log(Array.from(s7)) // [ 1, 2, 3, 4, 5 ]

let s8 = new Set(['a', 'b', 'c'])
console.log(s8.keys())
for(let item of s8.keys()) {
  console.log(item)
}
// "a"
// "b"
// "c"
for(let item of s8.values()) {
  console.log(item)
}
// "a"
// "b"
// "c"
for(let item of s8.entries()) {
  console.log(item)
}
// ["a", "a"]
// ["b", "b"]
// ["c", "c"]

console.log(Set.prototype[Symbol.iterator] === Set.prototype.values) // true
for(let item of s8) {
  console.log(item)
}
// "a"
// "b"
// "c"

let a3 = [1, 2, 'a', 'b']
a3.forEach((value, key) => console.log(`${key}: ${value}`))
// "0: 1"
// "1: 2"
// "2: a"
// "3: b"
let s9 = new Set(a3)
s9.forEach((value, key) => console.log(`${key}: ${value}`))
// "1: 1"
// "2: 2"
// "a: a"
// "b: b"

let a4 = new Set([1, 2, 3])
let a5 = new Set([2, 3, 4])
// 并集
let union = new Set([...a4, ...a5])
console.log([...union]) // [ 1, 2, 3, 4 ]
// 交集
let intersect = new Set([...a4].filter(x => a5.has(x)))
console.log([...intersect]) // [ 2, 3 ]
// 差集
let difference = new Set([...a4].filter(x => !a5.has(x)))
console.log([...difference]) // [ 1 ]

let ws1 = new WeakSet()
// ws1.add(1) // TypeError: Invalid value used in weak set
let obj = {}
let foo = {}
ws1.add(obj)
console.log(ws1.has(obj)) // true
console.log(ws1.has(foo)) // false
console.log(ws1.delete(obj)) // true
console.log(ws1.has(obj)) // false

console.log(ws1.size) // undefined
console.log(ws1.forEach) // undefined

const foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method() {
    if(!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用')
    }
    console.log('good')
  }
}
const fo = new Foo()
console.log(foos.has(fo))
fo.method()