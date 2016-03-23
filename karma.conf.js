// karma.conf.js
var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: false,
    frameworks: ['jasmine'],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack']
    },
    reporters: ['dots'],
    webpack: {
      module: {
        loaders: [
          {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'}
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    }
  });
};