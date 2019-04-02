mongoose = require('mongoose');
var Schema = mongoose.Schema;

const QuizSchema = new Schema({
    qTitle: String,
    question:String,
    answers: [
      {
        answer:String,
        correctAnswer: Boolean
      }
    ]
});

module.exports = mongoose.model('Quiz' , QuizSchema);
