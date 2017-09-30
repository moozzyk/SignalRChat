const readline = require('readline');
const signalR = require('@aspnet/signalr-client');

let rl = readline.createInterface(process.stdin, process.stdout);

rl.question('Enter your name: ', name => {
  console.log(name);
  
  let connection = new signalR.HubConnection('http://localhost:5000/chat');
  connection.start()
    .catch(error => {
      console.error(error);
      rl.close();
    });
});
