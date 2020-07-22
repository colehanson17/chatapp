console.log("hi");

const http = require("http").Server(app);
const io = require("socket.io")(http);

var socket = io.connect("http://localhost:8080");
// submit text message without reload/refresh the page
$("form").submit(function (e) {
  e.preventDefault(); // prevents page reloading
  if (
    $("#txt").val().length > 0 &&
    $("#txt").val().replace(/\s/g, "").length > 0
  )
    socket.emit("chat_message", $("#txt").val());
  $("#txt").val("");
  return false;
});
// append the chat text message
socket.on("chat_message", function (msg) {
  $("#messages").append($("<li>").html(msg));
});
// append text if someone is online
socket.on("is_online", function (username) {
  $("#messages").append($("<li>").html(username));
});
// ask username
var username = prompt("Please tell me your name");
socket.emit("username", username);
