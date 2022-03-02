// 手写 Promise
function myPromise(excutor) {
  let self = this;
  self.status = 'pending'; // 状态
  self.value = null; // 成功之后，返回数据
  self.reason = null; // 失败的原因

  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    if (self.status === 'pending') {
      self.value = value;
      self.status = 'fulfilled';
      self.onFulfilledCallbacks.forEach(item => item(value))
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.reason = reason;
      self.status = 'rejected';
      self.onRejectedCallbacks.forEach(item => item(reason))
    }
  }

  try {
    excutor(resolve, reject); // 立即执行
  } catch (error) {
    reject(error)
  }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (data) { resolve(data) }
  onRejected = typeof onFulfilled === 'function' ? onFulfilled : function (err) { throw err }

  // 链式调用
  let self = this;
  if (self.status === 'pending') {
    return new myPromise((resolve, reject) => {
      self.onFulfilledCallbacks.push(() => {
        let x = onFulfilled(self.value);
        x instanceof myPromise ? x.then(resolve, reject) : resolve(x);
      });
      self.onRejectedCallbacks.push(() => {
        let x = onRejected(self.reason);
        x instanceof myPromise ? x.then(resolve, reject) : resolve(x);
      });
    })
  }

  if (self.status === 'fulfilled') {
    return new myPromise((resolve, reject) => {
      try {
        let x = onFulfilled(self.value);
        x instanceof myPromise ? x.then(resolve, reject) : resolve(x);
      } catch (error) {
        reject(error)
      }
    })
  }

  if (self.status === 'rejected') {
    return new myPromise((resolve, reject) => {
      try {
        let x = onRejected(self.reason);
        x instanceof myPromise ? x.then(resolve, reject) : resolve(x);
      } catch (error) {
        reject(error)
      }
    })
  }
}

myPromise.prototype.catch = function(fn) {
  return this.then(null, fn);
}


let demo = new myPromise((resolve, reject) => {
  console.log(111)
  setTimeout(() => {
    resolve(222)
  }, 2000);
})
demo.then(data => console.log(data))