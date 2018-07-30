// class Person {
//   constructor(name, age) {
//     this.name = name
//     this.age = age
//   }
//   eat() {
//     alert(`${this.name} is eat somethings`)
//   }
// }

// class Student extends Person {
//   constructor(name, age, number) {
//     super(name, age)
//     this.number = number
//   }
//   study() {
//     alert(`${this.name} is study!`)
//   }
// }

// let xiaoming = new Student('xiaoming', 20, 'a1')

// let xiaohong = new Student('xiaohong', 21, 'a2')

// xiaoming.study()

// class jQuery {
//   constructor(selector) {
//     let slice = Array.prototype.slice
//     let dom = slice.call(document.querySelectorAll(selector))
//     let len = dom ? dom.length : 0
//     for (var i = 0; i < len; i++) {
//       this[i] = dom[i]
//     }
//     this.length = len
//     this.selector = selector || ''
//   }
//   append(mode) {
//     // ......
//   }
//   html(data) {
//     // ......
//   }
// }

// window.$ = function(selector) {
//   return new jQuery(selector)
// }

// var $p = $('p')
// console.log($p)
// console.log($p.html)

// 工厂模式
class Product{
  constructor(name) {
    this.name = name
  }
  init() {
    alert('init')
  }
  fn1() {
    alert('fn1')
  }
}

class Creator {
  create(name) {
    return new Product(name)
  }
}

let creator = new Creator()

let p = creator.create('tom')

p.init()
p.fn1()