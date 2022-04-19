const cachet = require('../dist/cachet.js');

const client = new cachet.Client({
  url: 'http://127.0.0.1/',
  key: 'secretkey',
});

client.addSubscriber({ email: 'subscriber@example.xyz' }).then((res) => {
  console.log(`Subscriber ${res.email} added with ID ${res.id}`);
});