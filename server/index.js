var app = require("express")(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  Quiz = require("./models/quiz-model"),
  Langusge = require("./models/language-model"),
  PORT = 3000;

var db =
  "mongodb+srv://chaim:cohen1234@spiderweb-vmgts.mongodb.net/textfilters";
mongoose.connect(db, { useNewUrlParser: true });
var con = mongoose.connection;
con.on("error", console.error.bind(console, "connection error:"));
con.once("open", function() {
  console.log("connection created");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", function(req, res) {
  res.send("Happy to see u");
});

app.get("/quiz", function(req, res) {
  console.log("getting all quiz");
  Quiz.find({}).exec(function(err, Quizzes) {
    if (err) {
      res.send(404, "Error has occurred!");
    } else {
      console.log(Quizzes);
      res.json(Quizzes);
    }
  });
});

// get one Member
app.get("/quiz/name:name", function(req, res) {
  // console.log(req.params);

  Quiz.find({ qTitle: req.params.name }).exec(function(err, Quizzes) {
    if (err) {
      console.log(err);
      res.send(404, "Error has occurred!");
    } else {
      res.json(Quizzes);
      console.log(Quizzes);
    }
  });
});
app.get("/quiz/:id", function(req, res) {
  console.log("getting on Member");
  Quiz.findOne({
    _id: req.params.id // body-parser did it !!!!
  }).exec(function(err, Quiz) {
    if (err) {
      // console.log(err);
      res.send(404, "Error Occurred!");
    } else {
      // console.log(Quiz);
      res.json(Quiz);
    }
  });
});

// Create document I
app.post("/quiz", function(req, res) {
  var newQuiz = new Quiz();
  newQuiz.qTitle = req.body.qTitle;
  newQuiz.question = req.body.question;
  newQuiz.answers = req.body.answers;

  newQuiz.save(function(err, quiz) {
    if (err) {
      console.log(err);
      res.send("Error saving quiz!");
    } else {
      // console.log(quiz);
      res.json(quiz);
    }
  });
});

app.post("/Langusge", function(req, res) {
  console.log(req.body.name);
  Langusge.findOneAndUpdate(
    { name: "langusges" },
    { $push: { language: req.body.name } },
    function(err, data) {
      if (err) {
        return res.status(500).send(err);
      }
      if (!data) {
        return res.status(404).end();
      }
      return res.status(200).send(data);
    }
  );
});
app.get("/Langusge", function(req, res) {
  Langusge.find({ name: "langusges" }).exec(function(err, langusges) {
    if (err) {
      console.log(err);
      res.send(404, "Error has occurred!");
    } else {
      res.json(langusges[0].language);
      // console.log(langusges[0].language);
    }
  });
});

// Update document
app.put("/quiz/:id", function(req, res) {
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
      upsert: true // [options] if this document has no title create one
    },
    function(err, newQuiz) {
      if (err) {
        console.log("error occured");
      } else {
        console.log(newQuiz);
        res.status(204).send(newQuiz);
      }
    }
  );
});

// Delte document
app.delete("/quiz/:id", function(req, res) {
  Quiz.findOneAndRemove(
    {
      _id: req.params.id
    },
    function(err, quiz) {
      if (err) {
        res.send("error deleting");
      } else {
        console.log(quiz);
        res.status(204).send(quiz);
      }
    }
  );
});

app.listen(process.env.PORT || PORT, function() {
  console.log("server started at port " + PORT);
});
