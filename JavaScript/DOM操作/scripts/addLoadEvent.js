function addLoadEvent(func) {
  var oldFunc = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldFunc();
      func()
    }
  }
}