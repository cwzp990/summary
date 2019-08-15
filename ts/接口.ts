// 接口

function printLabel(labelObj: { label: string }) {
  console.log(labelObj.label)
}

let myObj = { size: 10, label: 'size 10 Object' }
printLabel(myObj)

interface LabelValue {
  label: string;
}

function printLabel2(labelObj: LabelValue) {
  console.log(labelObj.label)
}

let myObj2 = { size: 10, label: 'size 10 Object' }
printLabel2(myObj2)

// ?代表可选属性
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: 'white', area: 100 };
  if (config.clor) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

let mySquare = createSquare({ color: 'black' })

// readonly代表只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 30; // 报错 因为x为只读属性

let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // 报错 数组里的元素为只读属性
ro.push(5)
ro.length = 10
a = ro as number[]

// readonly和const有点类型，在作为属性的时候应该使用readonly，而作为变量应该使用const

// 可选属性
interface SquareConfig2 {
  color?: string;
  width?: number;
  [propName: string]: string; // 任意属性
}

//  此处报错原因是，任意属性的值允许是string，但可选属性width的值却是number，number不是string的子属性

// 继承接口
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sizeLen: number;
}

let square = <Square>{}
square.color = 'blue'
square.penWidth = 5
square.sizeLen = 10

