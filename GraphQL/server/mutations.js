const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const path = require('path');

/**
 * type Mutation  用于修改
 * input xxx 表示输入的类型
 * type xxx 表示查询的类型
 * 注意: 必须要有 Query 用于查询数据, 否则会报错
 */
let schema = buildSchema(`
  type Query {
    accounts: [Account]
  }
  type Mutation {
    createAccount(input: AccountInput): Account
    updateAccount(id: ID!, input: AccountInput): Account
  }
  type Account {
    name: String
    age: Int
    sex: String
  }
  input AccountInput {
    name: String
    age: Int
    sex: String
  }
`);
const data = {};
let root = {
  accounts() {
    return Object.values(data);
  },
  createAccount({ input }) {
    // 保存数据
    data[input.name] = input;
    // 返回保存结果
    return data[input.name];
  },
  updateAccount({ id, input }) {
    const updatedAccount = Object.assign({}, data[id], input);
    data[id] = updatedAccount;
    return updatedAccount;
  }
};

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);
app.use(express.static(path.join(__dirname, '..')));
app.listen(3000);
