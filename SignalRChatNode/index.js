const readline = require('readline');

let rl = readline.createInterface(process.stdin, process.stdout);

rl.question('Enter your name: ', name => {
  console.log(name);
  rl.close();
});
