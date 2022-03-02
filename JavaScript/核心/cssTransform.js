// 赋能 =》 业务赋能
function Transform(element) {
  let units = {}, // 处理单位
    transform = '',
    transforms = {},
    attrs = ['scale', 'rotate', 'translate'];
  attrs.forEach(function (attr) {
    if (attr.indexOf('scale') > -1) {
      units[attr] = '';
      transforms[attr] = 1; // 默认值
    } else {
      units[attr] = attr.indexOf('translate') > -1 ? 'px' : 'deg';
      transforms[attr] = 0; // 默认值
    }
    // 点睛之笔 =》 双向数据绑定
    Object.defineProperty(element, attr, {
      get: function () {
        return transforms[attr];
      },
      set: function (value) {
        transform = '';
        transforms[attr] = value;
        attrs.forEach(function (attr) {
          transform += attr + '(' + transforms[attr] + units[attr] + ')'
        })
        element.style.transform = transform
      }
    })
  })
}