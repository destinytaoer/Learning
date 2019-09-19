let str = `
<%if(user){%>
  hello <%=user.name%>
<%}else{%>
  hello guest
<%}%>
<ul>
  <%for (let i = 0; i < total; i++) {%>
    <li><%=i%></li>
  <%}%>
</ul>
`;
let options = { user: { name: 'xx' }, total: 5 };
let ejs = require('ejs');
let result = ejs.render(str, options);
// console.log(result);

// 实现 render 方法
function render(str, options) {
  let head = 'let tpl = "";\nwith (obj) {\ntpl+=`';
  str = str.replace(/<%=(.+?)%>/g, function() {
    return '${' + arguments[1] + '}';
  });
  str = str.replace(/<%(.+?)%>/g, function() {
    return '`;\n' + arguments[1] + '\n tpl+=`';
  });
  let tail = '`\n}\n return tpl;';
  let html = head + str + tail;
  console.log(html);
  let fn = new Function('obj', html);
  return fn(options);
}
let result2 = render(str, options);
console.log(result2);
