var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var messages = [];

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/messages", (req, res) => {
  console.log(messages.length);
  res.send(messages);
});

app.post("/messages", (req, res) => {
  messages.push(req.body);
  console.log("messages are:-");
  console.log(messages);
  io.emit("message");
  res.sendStatus(200);
});

io.on("connection", (socket) => {
  console.log("New user added");
});

var server = http.listen(3000, () => {
  console.log("Server running on " + server.address().port);
});
