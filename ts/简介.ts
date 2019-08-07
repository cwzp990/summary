// 类型注解
function greeter(persion: string) {
  return "hello," + persion
}

let user = [1, 2, 3]

greeter(user)

// 接口
interface Persion {
  firstName: string;
  lastName: string;
}

function greeter2(persion: Persion) {
  return "hello," + persion.firstName + " " + persion.lastName
}

let user2 = {
  firstName: 'dell',
  lastName: 'lee'
}

greeter2(user2)