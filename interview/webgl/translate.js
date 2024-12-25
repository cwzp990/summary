const canvas = document.querySelector("canvas");
canvas.width = canvas.height = 300;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const transform = () => {}; // 后面调用的转换函数

const shape = [
  [0, 0],
  [0, 100],
  [100, 100],
  [100, 0],
];
ctx.beginPath();
shape.forEach((p) => ctx.lineTo(...transform(p)));
ctx.closePath;
ctx.fillStyle = "rgba(0,255,255,1)";
ctx.fill();

// 平移
function translate([x, y], dx = 0, dy = 0) {
  return [x + dx, y + dy];
}

// 缩放
function scale([x, y], xs = 1, ys = xs) {
  return [x * xs, y * ys];
}

// 错切
function skew([x, y], sx = 0, sy = 0) {
  const rad = (r) => (r * Math.PI) / 180; // 角度转弧度
  return [x + Math.tan(rad(sx)) * y, y + Math.tan(rad(sy)) * y]; // tan 对边/临边
}

// 旋转
/**
 * 三角函数公式：
 * sin(a+b) = sin(a)cos(b)+cos(a)sin(b)
 * cos(a+b) = cos(a)cos(b)-sin(a)sin(b)
 * 旋转前坐标点：[r*cos(a), r*sin(a)] = [P(x), P(y)]
 * 旋转后坐标点：[r*cos(a+b), r*sin(a+b)]
 * 展开：[r*(cos(a)cos(b)-sin(a)sin(b)), r*(sin(a)cos(b)+cos(a)sin(b))]
 * 化简：[P(x)cos(b) - P(y)sin(b), P(x)sin(b)+P(y)cos(b)]
 */
function rotate([x, y], deg = 0) {
  const rad = (deg * Math.PI) / 180;
  return [
    x * Math.cos(rad) - y * Math.sin(rad),
    x * Math.sin(rad) + y * Math.cos(rad),
  ];
}
