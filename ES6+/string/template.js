/* ES6 提供了字符串模板，方便我们进行字符串拼接 */
// 在 ES5 中
let name = 'destiny';
let str = 'hello, ' + name;

// 使用 ES6 字符串模板
let str1 = `hello, ${name}`;

// 原理解析
// let str1 = "hello, ${name}";
// function replace(str) {
//   return str.replace(/\$\{([^}])\}/g, function (matched, key) {
//     return eval(key);
//   })
// }
// replace(str1);

/* 其使用反引号进行包裹，里面的使用 ${} 包裹变量，简单实用。可以减少以往的大量 + 拼接，同时在反引号内还可以换行，增强拼接代码的可读性，尤其是在拼接 HTML 时 */
let html = `
  <div>
    <p></p>
  </div>
`

/* 另外，还支持标签写法，实际上就是函数执行 */
function processStr(strArr, ...valArr) {
  // 接收到的参数：第一个是字符串数组，由定义的变量隔开
  // 后面的参数是一个个传进来的变量值，可以通过剩余操作符接收为数组
  console.log(strArr, valArr);

  // strArr 数组中，还存在一个 raw 属性，存放没有处理过的字符串，与strArr 中存放的字符串是有区别的。
  // 比如 \n ，输出中会存在区别，在浏览器中，raw 是 \n，而 strArr 是回车符；在 node 打印中，raw 是 \\n，而 strArr 中是 \n，这也表明了为什么浏览器会那样显示，因为被转义了
  console.log(strArr.raw);
}
var name1 = 'taoer'
let newStr = processStr`hello, \n${name}, i am ${name1}`

// 标签模板的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。XXS 注入攻击
let message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    s += templateData[i];
  }
  return s;
}