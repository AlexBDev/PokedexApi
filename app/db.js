var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/test');

module.exports = mongoose;