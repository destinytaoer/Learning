const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const path = require('path');

let schema = buildSchema(`
  type Query {
    hello(isUppercase: Boolean): String
    account(username: String): Account
    friends: Friends
  }
  type Account {
    name: String
    age: Int
    salary(city: String): Int
  },
  type Friends {
    name: [String]
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
  },
  friends: () => {
    return {
      name: ['aa', 'bb', 'cc']
    };
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
