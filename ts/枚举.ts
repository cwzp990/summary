// 枚举
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

// 枚举默认从0开始，可以自行定义递增

// 字符串枚举
enum Direction2 {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}

enum Shape {
  Circle,
  Square
}

interface Circle {
  kind: Shape.Circle;
  radius: number;
}

enum E {
  X, Y, Z
}

function f(obj:{X: number}) {
  return obj.X
}

f(E) // 这样写是可以的，因为E有X属性，且值为数字

let a = E.X
let nameOfA = E[a] // 反向映射