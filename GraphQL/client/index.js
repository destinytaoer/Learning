let username = 'aa';
let city = '深圳';
let query = `
	query ($username: String, $city: String) {
		account(username: $username) {
      name
      age
      salary(city: $city)
    }
    friends {
      name
    }
	}
`;
fetch('http://localhost:3000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({
    query,
    variables: {
      username,
      city
    }
  })
})
  .then(r => r.json())
  .then(data => console.log('data:', data));
