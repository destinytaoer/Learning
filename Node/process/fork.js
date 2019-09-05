process.on('message', function(msg) {
  console.log('parent:', msg);
  process.send(msg);
});
