// 类
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return `hello,` + this.greeting
  }
}

let greeter = new Greeter('world')

// 继承
class Animal {
  move(distance: number = 0) {
    console.log(`Animal moved ${distance}`)
  }
}

class Dog extends Animal {
  bark() {
    console.log('woof~')
  }
}

const dog = new Dog()
dog.bark()
dog.move(100)
dog.bark()