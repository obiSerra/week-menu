// karma.conf.js
var webpack = require('webpack'),
    path = require('path');

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
    reporters: ['spec', 'coverage'],
    specReporter: {
      maxLogLines: 5,         // limit number of lines logged per test
      suppressErrorSummary: true,  // do not print error summary
      suppressFailed: false,  // do not print information about failed tests
      suppressPassed: false,  // do not print information about passed tests
      suppressSkipped: false,  // do not print information about skipped tests
      showSpecTiming: true // print the time elapsed for each spec
    },
    //plugins: ['karma-spec-reporter', webpack],
    webpack: {
      module: {
        loaders: [
          { test: /\.jsx?$/, exclude: [/node_modules/], loader: 'babel' },
          { test: /\.jsx?$/, include: [
            path.resolve(__dirname, '_tests_/src'),
            path.resolve(__dirname, 'src/')
          ], exclude: [/node_modules/], loader: 'isparta' }
          //{test: /\.jsx?$/, include: './_test_/', exclude: /node_modules/, loader: 'isparta'}
        ]
      },
      watch: true,
      isparta: {
        embedSource: true,
        noAutoWrap: true,
        // these babel options will be passed only to isparta and not to babel-loader
        babel: {
          presets: ['es2015', 'react']
        }
      }
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
        dir: 'coverage/',
        reporters: [
            // reporters not supporting the `file` property
            { type: 'html', subdir: 'report-html' },
            { type: 'text' },
            { type: 'text-summary'}
        ]
    }
  });
};