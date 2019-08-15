// 类型推论
// 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

window.onmousedown = function (mouseEvent) {
  console.log(mouseEvent.button);   //<- OK
  console.log(mouseEvent.kangaroo); //<- Error!
};

let myFavourite = 'seven'
let myFavourite2: string = 'seven'