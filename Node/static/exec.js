let { exec } = require('child_process');
exec('node a.js', function(err, stdout, stderr) {
  console.log(stdout);
});
