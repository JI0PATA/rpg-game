import ClientEngine from './ClientEngine';
import sprites from '../configs/sprites';
import ClientWorld from './ClientWorld';
import levelCfg from '../configs/world.json';
import gameObjects from '../configs/gameObjects.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects,
      player: null,
    });

    this.engine = this.createEngine();
    this.map = this.createWorld();

    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId));
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, time) => {
        this.map.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (k) => this.movePlayerByDirection(k)(-1, 0),
      ArrowRight: (k) => this.movePlayerByDirection(k)(1, 0),
      ArrowUp: (k) => this.movePlayerByDirection(k)(0, -1),
      ArrowDown: (k) => this.movePlayerByDirection(k)(0, 1),
    });
  }

  movePlayerByDirection(keydown) {
    // Если клавиша не нажата, то ничего не делаем
    if (!keydown) return () => false;
    // иначе будем двигать персонажа
    return (dcol, drow) => this.player.moveByCellCoord(dcol, drow, (cell) => cell.findObjectsByType('grass').length);
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
    }
  }
}

export default ClientGame;
