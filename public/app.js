const chattingList = document.querySelector('.chatting-list');
const button = document.querySelector('.button');
const input = document.querySelector('.input');

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log('socket이 연결됐습니다.');
});

socket.addEventListener('close', () => {
  console.log('socket이 끊어졌습니다.');
});

socket.addEventListener('message', (event) => {
  const { data } = event;
  chattingList.insertAdjacentHTML(
    'beforeend',
    `<li class="chatting-item">${data}</li>`
  );
});

const handleSubmit = () => {
  socket.send(input.value);
  input.value = '';
};

button.addEventListener('click', handleSubmit);
input.addEventListener('keyup', (event) => {
  if (event.code === 'Enter') handleSubmit();
});
