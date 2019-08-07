// 函数
function add(x: number, y: number): number {
  return x + y;
}

let myAdd = function (x: number, y: number): number {
  return x + y;
}

// 可选参数和默认参数
function buildName(firstName: string, lastName: string) {
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

function buildName3(firstName: string, lastName = 'end') {
  // ...
}

// 剩余参数
function buildName4(firstName: string, ...rest: string[]) {
  return firstName + ' ' + rest.join(' ');
}

let res5 = buildName4('1', '2', '3', '4', '5')