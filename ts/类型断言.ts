// 类型断言
function getLength(something: string | number): number {
  if ((<string>something).length) { // string类型
    return (<string>something).length
  } else {
    return something.toString().length
  }
}

// 类型别名
// 使用type创建类型别名，类型别名常用于联合类型
type Name = string
type NameResolve = () => string
type NameOrResolver = Name | NameResolve
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}