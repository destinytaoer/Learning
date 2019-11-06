const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

/**
 * 通过 buildSchema 方法来创建 schema, schema 定义了查询语句和类型
 * Query 是根类型, 是查询时首先找到的目标类型
 * GraphQL 的数据类型包括:
 * - 基本类型: 可以在 Schema 中直接使用
 *  - String
 *  - Int
 *  - Float
 *  - Boolean
 *  - ID
 * - 数组
 *  - [type]
 * - 对象
 *  - 自定义 type
 */
let schema = buildSchema(`
  type Account {
    name: String
    age: Int
    sex: String
    department: String
  }
  type Query {
    hello: String
    accountName: String
    age: Int
    account: Account
  }
`);

// 创建查询对应的处理器
let root = {
  hello: () => {
    // 函数名必须与前面的字段名相同
    return 'Hello World';
  },
  accountName: () => {
    return 'xxx';
  },
  age: () => {
    return 18;
  },
  account: () => {
    return {
      name: 'xxx',
      age: 18, // 如果 Int 类型返回字符串, 那么会先转换为数字, 然后再返回, 如果无法转换, 就会报错
      sex: 'male',
      department: 'SHEN ZHEN'
    };
  }
};

const app = express();
// 定义一个路径, 使用 graphqlHTTP 中间件来处理
app.use(
  '/',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true // 是否启用 graphiql 调试界面
  })
);

app.listen(3000);
