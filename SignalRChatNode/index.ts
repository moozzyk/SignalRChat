import * as readline from "readline"
import * as signalR from "@aspnet/signalr-client"

(<any>global).XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
(<any>global).WebSocket = require("websocket").w3cwebsocket;

let rl = readline.createInterface(process.stdin, process.stdout);

rl.question('Enter your name: ', async name => {
    console.log(name);

    let connection = new signalR.HubConnection("http://localhost:5000/chat");

    connection.on("broadcastMessage", (name, message) => {
      console.log(`${name}: ${message}`);
      rl.prompt(true);
    });

    try {
        await connection.start();
        rl.prompt();

        rl.on("line", async input => {
          if (input === "!q") {
            console.log("Stopping connection...");
            connection.stop();
            rl.close();
            return;
          }
          await connection.send("send", name, input);
        });
    }
    catch (error) {
        console.error(error);
        rl.close();
    }
});
