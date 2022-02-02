const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log('socket이 연결됐습니다.');
  setTimeout(() => socket.send('하이'), 4000);
});

socket.addEventListener('close', () => {
  console.log('socket이 끊어졌습니다.');
});

socket.addEventListener('message', (event) => {
  console.log('event:', event);
});
