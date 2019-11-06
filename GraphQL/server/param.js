const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

let schema = buildSchema(`
  type Query {
    hello(isUppercase: Boolean): String
    account(username: String): Account
  }
  type Account {
    name: String
    age: Int
    salary(city: String): Int
  }
`);
let root = {
  hello: ({ isUppercase }) => {
    let result = 'hello world';
    if (isUppercase) {
      return result.toUpperCase();
    }
    return result;
  },
  account: ({ username }) => {
    let name = username;
    let age = 18;
    let salary = ({ city }) => {
      if (city === '北京' || city === '深圳') {
        return 15000;
      }
      return 5000;
    };
    return {
      name,
      age,
      salary
    };
  }
};

const app = express();
app.use(
  '/',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(3000);
