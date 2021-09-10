function foo() {
  let array = [1, 2, 3, 4].map((item, index) => {
    return 10 + item
  })
  console.log(array)
}

module.exports = foo