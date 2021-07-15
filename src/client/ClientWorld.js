class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
      map: levelCfg.map,
    });
  }

  init() {
    this.map.forEach((row, y) => {
      row.forEach((cell, x) => {
        this.engine.renderSpriteFrame({
          sprite: ['terrain', cell[0]],
          frame: 0,
          x: x * 48,
          y: y * 48,
          w: 48,
          h: 48,
        });
      });
    });
  }
}

export default ClientWorld;
