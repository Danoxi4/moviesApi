const webpack = require('webpack');

module.exports = function override(config) {
  console.log('Webpack config before modification:', config);

  config.resolve.fallback = {
    ...config.resolve.fallback,
    process: require.resolve('process/browser'),
    buffer: require.resolve('buffer/'),
    stream: require.resolve('stream-browserify'),
    util: require.resolve('util/'),
    url: require.resolve('url/'),
    assert: require.resolve('assert/'),
    os: require.resolve('os-browserify/browser'),
    zlib: require.resolve('browserify-zlib'),
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
