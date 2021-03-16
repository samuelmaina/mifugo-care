const mongoose = require('mongoose');
const Base = require('./Auth');
const Client = Base.discriminator('Client', new mongoose.Schema({}));
module.exports = Client;
