const readline = require('readline');
const signalR = require('@aspnet/signalr-client');

XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
WebSocket = require('websocket').w3cwebsocket;

let rl = readline.createInterface(process.stdin, process.stdout);

rl.question('Enter your name: ', name => {
  console.log(name);

  let connection = new signalR.HubConnection('http://localhost:5000/chat');

  connection.on('broadcastMessage', (name, message) => {
    console.log(`${name}: ${message}`);
    rl.prompt(true);
  });

  connection.start()
    .then(() => {
      rl.prompt();
      rl.on('line', input => {
        if (input === '!q') {
          console.log('Stopping connection...');
          connection.stop();
          rl.close();
          return;
        }
        connection.send('send', name, input);
      });
    })
    .catch(error => {
      console.error(error);
      rl.close();
    });
});
