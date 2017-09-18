import * as signalR from "@aspnet/signalr-client"
import * as $ from "jquery"

// Get the user name and store it to prepend to messages.
$('#displayname').val(<string>prompt('Enter your name:', ''));
// Set initial focus to message input box.
$('#message').focus();

var connection = new signalR.HubConnection('/chat');
// Create a function that the hub can call to broadcast messages.
connection.on('broadcastMessage', function (name, message) {
    // Html encode display name and message.
    var encodedName = $('<div />').text(name).html();
    var encodedMsg = $('<div />').text(message).html();
    // Add the message to the page.
    $('#discussion').append('<li><strong>' + encodedName
        + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
});

// Start the connection.
connection.start().then(function () {
    $('#sendmessage').click(function () {
        // Call the Send method on the hub.
        connection.invoke('send', $('#displayname').val(), $('#message').val());
        // Clear text box and reset focus for next comment.
        $('#message').val('').focus();
    });
});
