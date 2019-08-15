// 函数
function add(x: number, y: number): number {
  return x + y;
}

let myAdd = function (x: number, y: number): number {
  return x + y;
}

let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
}

// 可选参数和默认参数
function buildName(lastName?: string, firstName: string) { // 可选参数后面不允许再出现必须参数
  return firstName + ' ' + lastName
}

let res1 = buildName('bob')
let res2 = buildName('bob', 'adams', 'Sr.')


function buildName2(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName
  } else {
    return firstName
  }
}

let res3 = buildName2('bob')
let res4 = buildName2('bob', 'adams', 'Sr.')

function buildName3(firstName: string, lastName = 'end') { // 默认参数
  // ...
}

// 剩余参数
// rest参数只能是最后一个参数，且是一个数组
function buildName4(firstName: string, ...rest: string[]) {
  return firstName + ' ' + rest.join(' ');
}

let res5 = buildName4('1', '2', '3', '4', '5')