const bind = require("../src/index")

test1("this 绑定成功")
test2("this,p1,p2 绑定成功")
test3("this,p1 绑定成功，后传 p2 调用成功")
test4("new 绑定成功")
test5("new 绑定成功，并且支持 prototype")
test6("bind 的 this 是 new 出来的对象")

function test1(message) {
  console.log(message)
  Function.prototype.bind2 = bind
  const fn = function () {
    return this
  }
  const newF1 = fn.bind2({ name: "good" })
  console.assert(newF1().name === "good")
}

function test2(message) {
  console.log(message)
  Function.prototype.bind2 = bind
  const fn = function (p1, p2) {
    return [this, p1, p2]
  }
  const newF2 = fn.bind2({ name: "good" }, 111, 222)
  console.assert(newF2()[0].name === "good")
  console.assert(newF2()[1] === 111)
  console.assert(newF2()[2] === 222)
}

function test3(message) {
  console.log(message)
  Function.prototype.bind2 = bind
  const fn = function (p1, p2) {
    return [this, p1, p2]
  }
  const copyFn2 = fn.bind2({ name: "good" }, 333)
  console.assert(copyFn2(444)[0].name === "good")
  console.assert(copyFn2(444)[1] === 333)
  console.assert(copyFn2(444)[2] === 444)
}

function test4(message) {
  console.log(message)
  Function.prototype.bind2 = bind
  const fn = function (p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
  const fn2 = fn.bind2(undefined, "x", "y")
  const object = new fn2()
  console.assert(object.p1 === "x")
  console.assert(object.p2 === "y")
}

function test5(message) {
  console.log(message)
  Function.prototype.bind2 = bind

  function fn(p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
  fn.prototype.sayHi = function () {}
  const fn2 = fn.bind2(undefined, "x", "y")
  const object = new fn2()
  console.assert(object.p1 === "x")
  console.assert(object.p2 === "y")
}

function test6(message) {
  console.log(message)
  Function.prototype.bind2 = bind
  function fn(p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
  fn.prototype.saHi = function () {}
  const object1 = new fn("a", "b")
  const fn2 = fn.bind2(object1, "x", "y")
  const object2 = fn2()
  console.assert(object2 === undefined)
  console.assert(object1.p1 === "x")
  console.assert(object1.p2 === "y")
}
