function fn(x = 0, y = 0) {
  console.log(this)
  console.log(x + y)
}
fn()
// window
// 0

const obj = {
  name: 'plumbiu'
}
fn.call(obj, 1, 2)
// { name: 'plumbiu' }
// 3

fn.apply(obj, [1, 2])
// { name: 'plumbiu' }
// 3
console.log(Math.max(1, 2, 3)) // 2
let arr = [1, 2, 3]
console.log(Math.max.apply(null, arr)) // 3