const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const app = express();

app.use(express.static('public')); // static 파일을 요청 할 때의 root 경로는 public이다.

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/app.html'));
});

const httpServer = http.createServer(app);
const socketServer = new WebSocket.Server({ server: httpServer }); // http와 ws를 같은 포트에서 사용 가능하다.

const sockets = [];

socketServer.on('connection', (socket) => {
  sockets.push(socket);
  socket.on('message', (message) => {
    sockets.forEach((s) => s.send(message.toString()));
  });
  socket.send('채팅방에 입장했습니다.');
});

httpServer.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
