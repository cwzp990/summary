// 类
class Animal {
  constructor(name) {
    this.name = name
  }
  sayHi() {
    return `my name is ${this.name}`
  }
}

let a = new Animal('Jack')
console.log(a.sayHi()) // my name is Jack

// 继承
class Cat extends Animal {
  constructor(name) {
    super(name) // 调用父类的constructor(name)
    console.log(this.name)
  }
  sayHi() {
    return 'Meow,' + super.sayHi(); // 调用父类的sayHi()
  }
}


let c = new Cat('Tom')
console.log(c.sayHi()) // Meow, my name is Tom

// 存储器
class Animal2 {
  constructor(name) {
    this.name = name
  }
  get name() {
    return 'Jack'
  }
  set name(value) {
    console.log('setter:', value)
  }
}

let d = new Animal2('Kitty') // setter: Kitty
d.name = 'Tom' // setter: Tom
console.log(d.name) // Jack

// 静态方法
class Animal3 {
  static isAnimal(a) {
    return a instanceof Animal3
  }
}

let e = new Animal3('Jack')
Animal3.isAnimal(a)

// 抽象类
abstract class Animal4 {
  abstract makeSound(): void
  move(): void {
    console.log('...')
  }
}

// 泛型函数 具体什么类型是调用这个方法的时候决定的
// 参数是什么类型就返回什么类型
function getData1(val: string): string {
  return val
}

function getData2(val: number): number {
  return val
}

function getData<T>(val: T): T {
  return val
}

getData<number>(123)
getData<string>('123')

// 泛型接口
interface Config {
  <T>(val: T): T
}

let getData3: Config = function <T>(val: T): T {
  return val
}

getData3<string>('张三')
getData3<string>(1234)