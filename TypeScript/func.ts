/**
 * 1. 返回值
 */
function none(): void {
  console.log(1);
  // return 1; // 报错
}

function something(): string {
  return 'string'
}

/**
 * 2. 参数校验
 */
function setInfo(name:string, age:number):void {
  console.log(`name: ${name}, age: ${age}`)
}

setInfo('sd', 12)
// setInfo('sd') //报错
// setInfo(23) // 报错
// setInfo(23,23) // 报错

// 使用接口校验
interface optionsType {
	name: string,
  age: number
}
function setInfo2(options:optionsType): void {
  console.log(`name: ${options.name}, age: ${options.age}`)
}
/**
 * 3. 可选参数和默认值
 */
function setInfo3(name:string, age:number=11):void {
  console.log(`name: ${name}, age: ${age}`)
}
setInfo3('aa') // name: aa, age: 11

function setInfo4(name:string, age?:number):void {
  console.log(`name: ${name}, age: ${age}`)
}
setInfo4('aa') // name: aa, age: 11

function setInfo5(name:string, age=11):void {
  console.log(`name: ${name}, age: ${age}`)
}
// setInfo5('aa','bb') // name: aa, age: 11

/**
 * 4. 剩余参数
 */
function sum(...num:number[]):number {
  return num.reduce((a, b)=>{
  	return a + b
  })
}


/**
 * 5. 函数的重载
 */
function getInfo(name: string): string
function getInfo(age: number): string
function getInfo(str: any): any {
  if (typeof str === 'string') {
    return 'name: ' + str;
  } else {
    return 'age:' + str;
  }
}
// getInfo(true)

/**
 * 6. 箭头函数 和匿名函数
 */
var anonymous = function (aa:number):void {
}
var arrow = (aa:number):void => {
}

function func(myAdd: (x: number, y: number) => number): number {
  return myAdd(1, 2)
}

var result = func((x, y) => {
  return x + y
})
console.log(result);

/**
 * 7. this 参数
 */
let man1 = {
  name: 'aa',
  sayName: function () {
    return () => {
      console.log(this.name) // this 指向 man
    }
  }
}
man1.sayName()() //=> aa 

interface Man {
  name: string,
  sayName(this: Man): () => void
}
let man2 = {
  name: 'aa',
  sayName: function (this: Man) {
    return () => {
      console.log(this.name) // this 指向 man
    }
  }
}
man2.sayName()() //=> aa


let man3 = {
  name: 'aa',
  sayName: function (this:void) {
    return () => {
      // console.log(this.name) // 报错
    }
  }
}
man3.sayName()() //=> aa