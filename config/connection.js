const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/social_api_app');

module.exports = mongoose.connection;