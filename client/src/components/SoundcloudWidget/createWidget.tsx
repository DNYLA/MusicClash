import load from 'load-script';

const createWidget = (id: string, cb: any) => {
  // load the API, it's namespaced as `window.SC`
  return load('https://w.soundcloud.com/player/api.js', () => {
    return cb(window.SC.Widget(id)); // eslint-disable-line new-cap
  });
};

export default createWidget;
