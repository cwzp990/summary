### 闭包产生的原因

es5中只存在全局作用域和函数作用域。当访问一个变量时，解释器会首先在当前作用域查找标示符，如果没有找到，就去父作用域找，直到找到该变量的标示符或者不在父作用域中，这就是作用域链

```js

var a = 1;
function f1() {
  var a = 2
  function f2() {
    var a = 3;
    console.log(a);//3
  }
}

var f3;
function f1() {
  var a = 2
  f3 = function() {
    console.log(a);
  }
}
f1();
f3();

```

### 闭包的表现形式

+ 返回一个函数

+ 作为函数参数传递

+ 定时器、事件监听、ajax请求，只要使用了回调函数，实际上就是在使用闭包

+ 立即执行函数

### 原型链

[这个建议去看一下这篇文章](https://www.cnblogs.com/wangfupeng1988/p/3977924.html)

**总结**

+ 对象都是通过函数创建的，函数又是一种对象

+ 函数默认有一个属性，prototype，值是一个对象，这个对象有一个叫做constructor的的属性，指向函数本身

+ 每个对象都有一个隐藏的属性_proto_，这个属性引用了创建这个对象函数的prototype
