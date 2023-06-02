const obj = {
  foo: 'bar',
  baz: 'qux',
  quux: 'quuz'
}

for(let key in obj) {
  console.log(key, obj[key])
}

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
console.log(x)
console.log(y)
console.log(z)

const message = {
  body: {
    user: {
      firstName: 'John',
    }
  }
} 
const firstName = message?.body?.user?.firstName || 'default'
console.log(firstName)

function checkEmail(email) {
  if(email.includes('@')) {
    return true
  }
  return
}
console.log(checkEmail?.('3434909403@qq.com')) 
console.log(checkEmail('3434909403qq.com'))

const nullObj = {
  test: 'hello',
  test1: '',
  test2: null,
  test3: undefined,
  test4: 0,
  test5: false,
  test6: NaN
}
console.log(nullObj.test ?? 'default')
console.log(nullObj.test1 ?? 'default')
console.log(nullObj.test2 ?? 'default')
console.log(nullObj.test3 ?? 'default')
console.log(nullObj.test4 ?? 'default')
console.log(nullObj.test5 ?? 'default')
console.log('---------')
console.log(NaN === NaN)
console.log(Object.is(NaN, NaN))
console.log(Object.is(+0, -0))
console.log(Object.is(1, 1))
console.log(Object.is({}, {}))
console.log(Object.is({
  foo: 'bar'
}, {
  foo: 'bar'
}))
console.log('----------')
const target = { a: 1 }
const source1 = { b: 2 }
const source2 = { c: 3 }
Object.assign(target, source1, source2)
console.log(target)
const a = { b: 1 }
console.log(Object.assign(a) === a)
console.log(typeof Object.assign(2))
let obj2 = { a: 1 }
console.log(Object.assign(obj2, undefined) === obj2)
console.log(Object.assign(obj2, null) === obj2)
console.log('----------')
const v1 = 'abc'
const v2 = true
const v3 = 10
const obj3 = Object.assign({}, v1, v2, v3)
console.log(obj3)
console.log('----------')
const obj4 = { a: { b: 1 } }
const obj5 = Object.assign({}, obj4)
obj4.a.b = 2
console.log(obj5.a.b)
const obj6 = { a: 1, b: 2 }
const obj7 = { b: 3, c: 4 }
console.log(Object.assign(obj6, obj7))
console.log(Object.assign([1, 2, 3], [4, 5]))
console.log('----------')
var obj8 = { foo: 'bar', baz: 42 }
console.log(Object.keys(obj8))

let { keys, values, entries } = Object
let obj9 = { a: 1, b: 2, c: 3 }
for(let key of keys(obj9)) {
  console.log(key)
}
for(let value of values(obj9)) {
  console.log(value)
}
for(let [key, value] of entries(obj9)) {
  console.log([key, value])
}
const obj10 = { 10: 'a', 2: 'b', 7: 'c' }
console.log(Object.values(obj10))

console.log(Object.values('foo'))
console.log(Object.values(42))
console.log(Object.values(true))
const obj11 = { foo: 'bar', baz: 42 }
const map = new Map(Object.entries(obj11))
console.log(map)
