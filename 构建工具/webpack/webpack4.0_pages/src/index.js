const fileName = 'index.js'

function foo() {
  const array = [1, 2, 3].map(num => {
    return num + 10
  })
  console.log(fileName + '=' + array);
}

foo()