export default {
  // eslint-disable-next-line
  pushEvent: function (event, sub) {
    const subs = this.subscribers || (this.subscribers = {});
    (subs[event] || (subs[event] = [])).push(sub);
  },

  // eslint-disable-next-line
  on: function (event, callback) {
    this.pushEvent(event, [true, callback]);
  },

  // eslint-disable-next-line
  once: function (event, callback) {
    this.pushEvent(event, [false, callback]);
  },

  // eslint-disable-next-line
  un: function (event, subToUn) {
    const subs = this.subscribers;
    if (subs && subs[event]) subs[event] = subs[event].filter((sub) => sub !== subToUn);
  },

  // eslint-disable-next-line
  trigger: function (event, data = null) {
    const subs = this.subscribers;
    if (subs && subs[event]) {
      // вызываем все обработчики
      subs[event].forEach((sub) => sub[1](event, data, this));
      // удаляем все одноразовые обработчики
      subs[event] = subs[event].filter((sub) => sub[0]);
    }
  },
};
