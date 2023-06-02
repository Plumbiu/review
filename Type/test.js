let data = {
  inf: {
    min: [1, 2, 3, 4, 5],
    s: [1, 2, 3, 4, 5],
    iss: [1, 2, 3, 4, 5]
  }
}
let j = 2
// 简写上述代码
let { imin, is, iss } = data.inf[j]
console.log(imin, is, iss)