// JS 的 with 作用域

let obj = { name: 'xxx', age: 11 };

// with 作用域指定了一个对象，其内部的变量可以从这个对象的属性上取值
with (obj) {
  console.log(name); // xxx
  console.log(age); // 11
  // console.log(xxx); // 如果 obj 中没有，且 with 内没有定义，就会报错
}

// ejs 原理
let str = `
<%if(user){%>
  hello <%=name%>
<%}else{%>
  hello guest
<%}%>
`;

//=> 转换为函数体
let script = `
  let tpl = "";
  with(obj) {
    if (name) {
      tpl += \`hello \${name}\`
    } else {
      tpl += "hello guest"
    }
  }
  return tpl;
`;
let fn = new Function('obj', script);
let result = fn(obj);
console.log(result);
