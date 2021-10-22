"use strict";

(function () {
  function foo(num1, num2) {
    return num1 + num2;
  }

  console.log(foo(1, 2));
  console.log(foo(3, 4));
  console.log(foo(5, 6));
  console.log(foo(8, 9));
})();
;"use strict";

(function () {
  var result = [1, 2, 3, 4].map(function (item, index) {
    return item + 10;
  });
  console.log('result = ', result);
})();
