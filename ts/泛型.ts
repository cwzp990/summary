// 泛型
function identity(arg: number): number {
  return arg
}

function identity2<T>(args: T): T {
  return args
}

let output = identity2<string>('1')
let output2 = identity2<number>('1')
let output3 = identity2<string>(2)

// 泛型变量
function myFn<T>(args: T[]): T[] {
  console.log(args.length)
  return args
}

// 泛型接口
interface Test {
  <T>(args: T): T
}