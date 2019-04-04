mongoose = require('mongoose');
var Schema = mongoose.Schema;

const LangusgeSchema = new Schema({
    name: String,
    language: [String]
});

module.exports = mongoose.model('Langusge' , LangusgeSchema);
