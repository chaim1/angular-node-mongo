var app = require("express")(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  cors = require('cors'),
  Quiz = require('./models/quiz-model'),
  PORT = 3000;



var db = "mongodb+srv://chaim:cohen1234@spiderweb-vmgts.mongodb.net/textfilters";
mongoose.connect(db, { useNewUrlParser: true });
var con = mongoose.connection;
con.on('error', console.error.bind(console, 'connection error:'));
con.once('open', function () {
  console.log("connection created");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.get('/', function (req, res) {
  res.send('Happy to see u');
});

app.get('/quiz', function (req, res) {
  console.log('getting all quiz');
  Quiz.find({})
      .exec(function (err, Quizzes) {
          if (err) {
              res.send(404, 'Error has occurred!')
          } else {
              console.log(Quizzes);
              res.json(Quizzes);
          }
      });
});

// get one Member
app.get('/quiz/name:name', function (req, res) {
  console.log(req.params);
  res.json(req.params)

  // console.log('getting all quiz');
  // Quiz.find({})
  //     .exec(function (err, Quizzes) {
  //         if (err) {
  //             res.send(404, 'Error has occurred!')
  //         } else {
  //             console.log(Quizzes);
  //             res.json(Quizzes);
  //         }
  //     });
});
app.get('/quiz/:id', function (req, res) {
  console.log('getting on Member');
  Quiz.findOne({
      _id: req.params.id // body-parser did it !!!!
  }).exec(function (err, Quiz) {
      if (err) {
          console.log(err);
          res.send(404, 'Error Occurred!')
      } else {
          console.log(Quiz);
          res.json(Quiz);
      }
  });
});

// Create document I
app.post('/quiz' , function(req,res) {
  var newQuiz = new Quiz();
  newQuiz.qTitle =    'PHP'; //req.body.name;
  newQuiz.question =  'question';
  newQuiz.answers = [
      {
        answer: 'sdfa',
        correctAnswer: true
    },
    {
      answer: 'sdfa',
      correctAnswer: true
  }
  ];

  newQuiz.save(function(err,quiz) {
      if (err) {
          console.log(err);
          res.send('Error saving quiz!')
      } else {
          console.log(quiz);
          res.json(quiz);
      }
  })
})
;

// Update document
app.put('/quiz/:id', function(req,res) {
 Quiz.findOneAndUpdate(
     {
         _id: req.params.id // [query]
     },
     {
         $set: {
             answers: {
               $push: [{}]
             }
         }
      },
      {
          upsert: true      // [options] if this document has no title create one
      },
      function(err,newQuiz) {
          if (err) { console.log('error occured');
          } else {
              console.log(newQuiz);
              res.status(204).send(newQuiz);
          }
      });
});

// Delte document
app.delete('/quiz/:id' , function(req,res) {
  Quiz.findOneAndRemove(
       {
          _id: req.params.id
      }, function(err, quiz) {
          if (err) {
              res.send('error deleting')
          }else {
              console.log(quiz);
              res.status(204).send(quiz);
          }
      });
});


app.listen( process.env.PORT || PORT, function() {
  console.log("server started at port " + PORT);
});
