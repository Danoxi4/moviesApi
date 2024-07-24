const webpack = require('webpack');

module.exports = function override(config) {
  console.log('Webpack config before modification:', config);

  config.resolve.alias = {
    http: 'stream-http',
    https: 'https-browserify',
    buffer: 'buffer/',
    stream: 'stream-browserify',
    util: 'util/',
    url: 'url/',
    assert: 'assert/',
    os: 'os-browserify/browser',
    process: 'process/browser',
    zlib: 'browserify-zlib',
  };
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  console.log('Webpack config after modification:', config);

  return config;
};
