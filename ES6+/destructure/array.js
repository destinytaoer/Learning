/* 1. 解构赋值属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。 */

// let [foo, [[bar], baz]] = [1, [[2], 3]];
// console.log(foo, bar, baz); //=> 1 2 3

/* 2. 不想要某个值 */
// 不想要的值在前面，需要补位; 在后面，则不需要处理
// let [, , third] = ["foo", "bar", "baz"];
// console.log(third); // "baz"
// let [first] = ["foo", "bar", "baz"];
// console.log(first); // foo

/* 3. 解构不成功，值为 undefined */
// let [foo] = []
// console.log(foo); //=> undefined

/* 4. 默认值 使用 = 号来赋予默认值*/
// let [foo = 1] = [];
// console.log(foo); //=> 1
// 使用严格等于 undefined，默认值才会生效
// let [foo = 1] = [null];
// console.log(foo); //=> null

/* 5. 等号右边必须是具有 Iterator 接口，不一定是数组 */
// let [x, y, z] = new Set(['a', 'b', 'c']);
// console.log(x, y, z); //=> a b c
