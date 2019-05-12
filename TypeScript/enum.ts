/**
 * 数字枚举
 */
enum Direction {
  up,
  down,
  left,
  right,
}
// 自动分配 up-0 down-1 left-2 right-3

enum Direction2 {
  up = 1,
  down, // 2
  left, // 3
  right // 4
}

enum Direction3 {
  up, // 0
  down = 2,
  left, // 3
  right // 4
}

/**
 * 字符串枚举
 */
enum Direction4 {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

/**
 * 异构枚举，不建议使用
 */

enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}

/**
 * 联合枚举与枚举成员的类型
 */
// 枚举成员可以作为类型
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let circle: Circle = {
  // kind: ShapeKind.Square, // 报错
  kind: ShapeKind.Circle,
  radius: 100,
}

/**
 * const枚举
 */
const enum Enum {
  A = 1,
  B = A * 2
}
// 在编译阶段会被删除
const enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
// 生成后的代码为：
// var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

/**
 * 外部枚举
 */

declare enum Direction3 {
  A = 1,
  B,
  C = 2
}