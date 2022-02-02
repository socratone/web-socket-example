const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/app.html'));
});

const server = http.createServer(app);
const socketServer = new WebSocket.Server({ server }); // server를 넣으면 둘다 돌릴 수 있음

const sockets = [];

socketServer.on('connection', (socket) => {
  sockets.push(socket);
  socket.on('message', (message) => {
    sockets.forEach((s) => s.send(message.toString()));
  });
  socket.send('채팅방에 입장했습니다.');
});

server.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
