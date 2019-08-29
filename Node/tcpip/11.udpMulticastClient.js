let dgram = require('dgram');
let client = dgram.createSocket('udp4');
client.on('listening', function() {
  client.addMembership('230.185.192.108');
});
client.on('message', function(msg, remote) {
  console.log(msg.toString());
});
client.bind(8080, '172.29.12.20');
