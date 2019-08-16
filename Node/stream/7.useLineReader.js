let LineReader = require('./6.LineReader');

let lr = new LineReader('./3.txt');
lr.on('newLine', function(data) {
  console.log(data);
});
lr.on('end', function() {
  console.log('end');
});
