let argv = {};
let args = process.argv;
// node 1.hello.js --name aa
for (let i = 2; i < args.length; i++) {
  let val = args[i];
  if (val.startsWith('--')) {
    argv[val.slice(2)] = args[++i];
  }
}

exports.argv = argv;
