// 基础类型

let isDone: boolean = false

let isNum: number = 6

let name: string = 'Tom'

let sentence: string = `hello, my name is ${name}`

let list: number[] = [1, 2, 3]

let list2: Array<number> = [1, 2, 3]

// 元组 表示一个已知元素数量和类型的数组，各元素的类型不必相同

let x: [string, number]

x = ['hello', 66]
console.log(x[0].substr(1))

x = [66, 'hello']
console.log(x[0].substr(1))

// 枚举 为一组数值赋予友好的名字。枚举的作用是，你可以由枚举的值得到它的名字

enum Color { Red, Green, Yellow }
let c: Color = Color.Green

// 默认从0开始为元素编号，可以手动指定成员的数值
enum Color1 { Red = 1, Green, Yellow }
let colorName: string = Color[1]
console.log(colorName)

// 任意值
let notSure: any = '1'

// 空值 当一个函数没有返回值时，它的返回值为空值
function noReturn(): void {
  console.log('no return')
}

// 声明一个void类型并没有什么卵用，因为你只能赋予它undefined和null

// null 和 undefined
// 默认情况下，null和undefined是所有类型的子类型，就是说你可以把null和undefined赋值给number类型，严格模式除外
let u: undefined = undefined

let n: null = null

// Object
let o: object = { a: 1 }

// 类型断言
// 某些时候，你会比TS更清楚的知道某个值的类型

let someValue:any = 'this is a string'
let strLen:number = (<string>someValue).length

let strLen1:number = (someValue as string).length // 在jsx语法中，只有as是被允许的

