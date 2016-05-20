// tests.webpack.js
const testContext = require.context('./_tests_', true, /\.spec\.jsx?$/);
testContext.keys().forEach(testContext);

var context = require.context('./src', true, /\.js$/);
context.keys().forEach(context);