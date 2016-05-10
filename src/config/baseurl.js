if (process.env.NODE_ENV === 'production') {
    module.exports = require('./baseurl-prod.js');
} else {
    module.exports = require('./baseurl-dev.js');
}