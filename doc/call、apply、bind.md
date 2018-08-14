# call、apply、bind的区别

在JavaScript中，call、apply和bind是Function对象自带的三个方法，这三个方法的主要作用是改变函数中的this指向

call、apply、bind方法的共同点和区别：

+ apply 、 call 、bind 三者都是用来改变函数的this对象的指向的

+ apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文（函数的每次调用都会拥有一个特殊值——本次调用的上下文（context）——这就是this关键字的值）

+ apply 、 call 、bind 三者都可以利用后续参数传参

+ bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用

## call

call([thisObj[,arg1[, arg2[, [,.argN]]]]])

定义：调用一个对象的一个方法，以另一个对象替换当前对象

说明： call 方法可以用来代替另一个对象调用一个方法
call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象

thisObj的取值有以下4种情况：
（1） 不传，或者传null,undefined， 函数中的this指向window对象
（2） 传递另一个函数的函数名，函数中的this指向这个函数的引用
（3） 传递字符串、数值或布尔类型等基础类型，函数中的this指向其对应的包装对象，如 String、Number、Boolean
（4） 传递一个对象，函数中的this指向这个对象