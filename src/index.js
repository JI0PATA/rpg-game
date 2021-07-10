import './index.scss';
import ClientGame from './client/ClientGame';

window.addEventListener('load', () => {
  ClientGame.init({ tagId: 'game' });
});

//
// import SenseiWalk from './assets/Male-3-Walk.png';
// import terrainAtlas from './assets/terrain.png';
// import worldCfg from './configs/world.json';
// import sprites from './configs/sprites';
//
// const canvas = document.getElementById('game');
// const ctx = canvas.getContext('2d');
//
// const spriteW = 48;
// const spriteH = 48;
//
// const terrain = document.createElement('img');
// terrain.src = terrainAtlas;
//
// terrain.addEventListener('load', (_) => {
//   const { map } = worldCfg;
//
//   map.forEach((cfgRow, y) => {
//     cfgRow.forEach((cfgCell, x) => {
//       const [sX, sY, sW, sH] = sprites.terrain[cfgCell[0]].frames[0];
//       ctx.drawImage(terrain, sX, sY, sW, sH, x * spriteW, y * spriteH, spriteW, spriteH);
//     });
//   });
// });
//
// const shots = 3;
// let cycle = 0;
// const initialPositionHero = {
//   x: 300 - spriteW / 2,
//   y: 300 - spriteH / 2,
// };
// const pressedKeys = {
//   bottom: false,
//   right: false,
//   left: false,
//   top: false,
// };
//
// function changeKeyPressed(e, state) {
//   if (['Down', 'ArrowDown'].includes(e.key)) {
//     pressedKeys.bottom = state;
//   } else if (['Right', 'ArrowRight'].includes(e.key)) {
//     pressedKeys.right = state;
//   } else if (['Left', 'ArrowLeft'].includes(e.key)) {
//     pressedKeys.left = state;
//   } else if (['Up', 'ArrowUp'].includes(e.key)) {
//     pressedKeys.top = state;
//   }
// }
//
// function keyDownHandler(e) {
//   changeKeyPressed(e, true);
// }
//
// function keyUpHandler(e) {
//   changeKeyPressed(e, false);
// }
//
// document.addEventListener('keydown', keyDownHandler);
// document.addEventListener('keyup', keyUpHandler);
//
// const img = document.createElement('img');
// img.src = SenseiWalk;
//
// let pY = initialPositionHero.y;
// let pX = initialPositionHero.x;
// let direction = 0;
//
// img.addEventListener('load', () => {
//   window.requestAnimationFrame(walk)
// });
//
// function walk(timestamp) {
//   if (!(pY < 0 || pY > 600 - spriteH || pX < 0 || pX > 600 - spriteW)) {
//     if (pressedKeys.bottom) {
//       pY += 10;
//       direction = 0;
//     } else if (pressedKeys.top) {
//       pY -= 10;
//       direction = 3;
//     } else if (pressedKeys.right) {
//       pX += 10;
//       direction = 2;
//     } else if (pressedKeys.left) {
//       pX -= 10;
//       direction = 1;
//     }
//   } else {
//     if (pX < 0) pX = 0;
//     else if (pX > 600 - spriteW) pX = 600 - spriteW;
//     if (pY < 0) pY = 0;
//     else if (pY > 600 - spriteH) pY = 600 - spriteH;
//   }
//
//   if (pressedKeys.bottom || pressedKeys.top || pressedKeys.right || pressedKeys.left) {
//     cycle = (cycle + 1) % shots;
//   }
//
//   ctx.clearRect(0, 0, 600, 600);
//   ctx.drawImage(img, cycle * spriteW, direction * 48, spriteW, spriteH, pX, pY, 48, 48);
//
//   window.requestAnimationFrame(walk)
// }
