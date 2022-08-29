// fn.bind({name:'good'}) 等价于 f1.bind.call(this,{name:'good'})
// 所以在 bind 函数里 ，this 就是指 fn

var slice = Array.prototype.slice
function bind(asThis) {
  var args = slice.call(arguments, 1)
  var fn = this
  if (fn instanceof Function === false) {
    throw new Error("bind 必须调用在函数身上")
  }
  function resultFn() {
    var args2 = slice.call(arguments, 0)
    return fn.apply(
      this instanceof resultFn ? this : asThis,
      args.concat(args2)
    )
  }
  resultFn.prototype = fn.prototype
  return resultFn
}

function bind2(asThis, ...args) {
  const fn = this
  function resultFn(...args2) {
    return fn.call(
      // 判断是否是通过 new 调用，new 调用就用 new 的 this
      // resultFn.prototype.isPrototypeOf(this)
      this instanceof resultFn ? this : asThis,
      ...args,
      ...args2
    )
  }
  resultFn.prototype = fn.prototype
  return resultFn
}

module.exports = bind

if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}
