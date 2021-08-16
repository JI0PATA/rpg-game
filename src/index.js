import { io } from 'socket.io-client';
import './index.scss';
import ClientGame from './client/ClientGame';

const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);

export default function getTime(date) {
  const convertDate = new Date(date);
  return `${normalize(convertDate.getHours())}:${normalize(convertDate.getMinutes())}:${normalize(
    convertDate.getSeconds(),
  )}`;
}

window.addEventListener('load', () => {
  const socket = io('https://jsprochat.herokuapp.com');

  const $nameForm = document.getElementById('nameForm');

  const $chatWrap = document.querySelector('.chat-wrap');
  const $form = document.getElementById('form');
  const $input = document.getElementById('input');
  const $message = document.querySelector('.message');

  let playerId;

  const submitName = (ev) => {
    ev.preventDefault();

    const name = document.getElementById('name').value.trim();

    ClientGame.init({ tagId: 'game', name });

    socket.emit('start', name);
    socket.on('chat connection', (data) => {
      if (playerId) return;
      playerId = data.id;
    });

    $chatWrap.style.display = 'block';

    document.getElementById('startGame').remove();
    $nameForm.removeEventListener('submit', submitName);
  };

  $nameForm.addEventListener('submit', submitName);

  $form.addEventListener('submit', (e) => {
    e.preventDefault();

    if ($input.value) {
      socket.emit('chat message', $input.value);
      $input.value = '';
    }
  });

  socket.on('chat connection', (data) => {
    $message.insertAdjacentHTML('beforeend', `<p><strong>${getTime(data.time)}</strong> - ${data.msg}</p>`);
  });

  socket.on('chat disconnect', (data) => {
    $message.insertAdjacentHTML('beforeend', `<p><strong>${getTime(data.time)}</strong> - ${data.msg}</p>`);
  });

  socket.on('chat message', (data) => {
    let style = '';

    if (data.id === playerId) {
      style = 'background: darkred; color: #fff;';
    }

    $message.insertAdjacentHTML(
      'beforeend',
      `<p><strong style="${style}">(${getTime(data.time)}) ${data.name}</strong> - ${data.msg}</p>`,
    );
  });

  socket.on('chat online', (data) => {
    $message.insertAdjacentHTML('beforeend', `<p>Сейчас онлайн - ${data.online}</p>`);
  });
});
