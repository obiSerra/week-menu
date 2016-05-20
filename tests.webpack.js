// tests.webpack.js
const testContext = require.context('./_tests_/', true, /\.spec\.jsx?$/);
testContext.keys().forEach(testContext);

var context = require.context('./src/actions', true, /\.jsx?$/);
context.keys().forEach(context);