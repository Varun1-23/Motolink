module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // no plugins!
  };
};
