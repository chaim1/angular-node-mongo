import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { QuizService } from "src/app/services/quiz.service";

@Component({
  selector: "app-add-qustion",
  templateUrl: "./add-qustion.component.html",
  styleUrls: ["./add-qustion.component.css"]
})
export class AddQustionComponent implements OnInit {
  qustionToDb;
  QuestionForm: FormGroup;
  Langusge;
  constructor(private quizServic: QuizService) {
    var interval = setInterval(() => {
      this.Langusge = this.quizServic.getLangusges();
      console.log(this.Langusge);
      if (this.Langusge) {
        clearInterval(interval);
      }
    }, 1000);
  }

  ngOnInit() {
    this.QuestionForm = new FormGroup({
      QuestionData: new FormGroup({
        questionName: new FormControl(null),
        question: new FormControl(null),
        Answer1Data: new FormGroup({
          Answer1: new FormControl(null),
          Answer1true: new FormControl(false)
        }),
        Answer2Data: new FormGroup({
          Answer2: new FormControl(null),
          Answer2true: new FormControl(false)
        }),
        Answer3Data: new FormGroup({
          Answer3: new FormControl(null),
          Answer3true: new FormControl(false)
        }),
        Answer4Data: new FormGroup({
          Answer4: new FormControl(null),
          Answer4true: new FormControl(false)
        })
      })
    });
    // this.QuestionForm.patchValue({
    //   QuestionData:{
    //     questionName: ''}
    // })
  }
  onSaveQuestion() {
    console.log(this.QuestionForm.value.QuestionData.questionName);
    this.qustionToDb = {
      qTitle: this.QuestionForm.value.QuestionData.questionName,
      question: this.QuestionForm.value.QuestionData.question,
      answers: [
        {
          answer: this.QuestionForm.value.QuestionData.Answer1Data.Answer1,
          correctAnswer: this.QuestionForm.value.QuestionData.Answer1Data
            .Answer1true
        },
        {
          answer: this.QuestionForm.value.QuestionData.Answer2Data.Answer2,
          correctAnswer: this.QuestionForm.value.QuestionData.Answer2Data
            .Answer2true
        },
        {
          answer: this.QuestionForm.value.QuestionData.Answer3Data.Answer3,
          correctAnswer: this.QuestionForm.value.QuestionData.Answer3Data
            .Answer3true
        },
        {
          answer: this.QuestionForm.value.QuestionData.Answer4Data.Answer4,
          correctAnswer: this.QuestionForm.value.QuestionData.Answer4Data
            .Answer4true
        }
      ]
    };
    console.log(this.qustionToDb);
    this.quizServic.addQuestion(this.qustionToDb);
    if (
      this.Langusge.indexOf(this.QuestionForm.value.QuestionData.questionName) >
      -1
    ) {
      console.log(1);
    } else {
      this.quizServic.addLangusge({
        name: this.QuestionForm.value.QuestionData.questionName
      });
    }
  }
  value1true() {
    this.QuestionForm.patchValue({
      QuestionData: {
        Answer1Data: {
          Answer1true: true
        },
        Answer2Data: {
          Answer1true: false
        },
        Answer3Data: {
          Answer1true: false
        },
        Answer4Data: {
          Answer1true: false
        }
      }
    });
  }
  value2true() {
    this.QuestionForm.patchValue({
      QuestionData: {
        Answer1Data: {
          Answer1true: false
        },
        Answer2Data: {
          Answer1true: true
        },
        Answer3Data: {
          Answer1true: false
        },
        Answer4Data: {
          Answer1true: false
        }
      }
    });
  }
  value3true() {
    this.QuestionForm.patchValue({
      QuestionData: {
        Answer1Data: {
          Answer1true: false
        },
        Answer2Data: {
          Answer1true: false
        },
        Answer3Data: {
          Answer1true: true
        },
        Answer4Data: {
          Answer1true: false
        }
      }
    });
  }
  value4true() {
    this.QuestionForm.patchValue({
      QuestionData: {
        Answer1Data: {
          Answer1true: false
        },
        Answer2Data: {
          Answer1true: false
        },
        Answer3Data: {
          Answer1true: false
        },
        Answer4Data: {
          Answer1true: true
        }
      }
    });
  }
}
