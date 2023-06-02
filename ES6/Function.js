function log(x, y = 'hello') {
  console.log(x, y)
}
log('hi')
log('hi', 'world')
log('hi', '')
function add(...values) {
  let sum = 0
  for (let val of values) {
    sum += val
  }
  console.log(typeof values)
  return sum
}
console.log(add(2, 5, 3))

console.log(log.name)