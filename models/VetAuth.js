const mongoose = require('mongoose');
const Base = require('./Auth');
const Schema = mongoose.Schema;

const Vet = new Schema({});

module.exports = Base.discriminator('Vet', Vet);
