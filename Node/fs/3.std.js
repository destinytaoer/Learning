const fs = require('fs');

fs.write(2, Buffer.from('a'), 0, 1, null, function(err, length, buffer) {});
fs.open('./1.txt', 'r', 0o666, function(err, fd) {
  console.log(fd);
});
fs.open('./1.txt', 'r', 0o666, function(err, fd) {
  console.log(fd);
  fs.close(fd, function() {
    fs.open('./1.txt', 'r', 0o666, function(err, fd) {
      console.log(fd);
    });
  });
});
fs.open('./1.txt', 'r', 0o666, function(err, fd) {
  console.log(fd);
});
fs.open('./1.txt', 'r', 0o666, function(err, fd) {
  console.log(fd);
});
