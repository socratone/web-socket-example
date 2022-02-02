const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/app.html'));
});

app.get('/app.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/app.js'));
});

const server = http.createServer(app);
const socketServer = new WebSocket.Server({ server }); // server를 넣으면 둘다 돌릴 수 있음

const sockets = [];

socketServer.on('connection', (socket) => {
  sockets.push(socket);
  console.log('socket이 연결됐습니다.');
  socket.on('close', () => console.log('socket이 끊어졌습니다.'));
  socket.on('message', (message) => {
    sockets.forEach((s) => s.send(message.toString()));
  });

  socket.send('채팅방에 입장했어요!');
});

server.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
