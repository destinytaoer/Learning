// accounts 是数组, [Account], 依然需要展开来选择其下面的字段,如果是普通类型数组则不需要
let query = `
	query {
		accounts {
      name
      age
    }
	}
`;
// mutation 则需要传入参数, 并且接收一下返回值 Account
let create = `
  mutation ($input: AccountInput){
    createAccount(input: $input) {
      name
      age
    }
  }
`;
let update = `
  mutation ($id: ID!, $input: AccountInput) {
    updateAccount(id: $id, input: $input) {
      name
      age
    }
  }
`;
function ajax(query, variables) {
  return fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query,
      variables
    })
  });
}

ajax(query, {})
  .then(r => r.json())
  .then(data => {
    console.log('data:', data);
    return Promise.all([
      ajax(create, { input: { name: 'xxx' } }),
      ajax(create, { input: { name: 'bbb', age: 18 } })
    ]);
  })
  .then(r => {
    return Promise.all(r.map(item => item.json()));
  })
  .then(data => {
    console.log('create:', data);
    return ajax(query);
  })
  .then(r => r.json())
  .then(data => {
    console.log('data:', data);
    return ajax(update, { id: 'xxx', input: { age: 20 } });
  })
  .then(r => r.json())
  .then(data => {
    console.log('update:', data);
    return ajax(query);
  })
  .then(r => r.json())
  .then(data => {
    console.log('data:', data);
  });
