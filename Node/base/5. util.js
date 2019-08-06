let util = require('util');
let obj = {
  name: 'aa',
  age: 12,
  city: {
    name: 'sz',
    a: {
      xxx: 1
    }
  }
};

console.log(util.inspect(obj, { depth: 2, colors: ['red'] }));
