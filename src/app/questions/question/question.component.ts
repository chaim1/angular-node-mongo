import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { QuizService } from "src/app/services/quiz.service";
import { NgModel, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"]
})
export class QuestionComponent implements OnInit {
  @ViewChild("answ") answer: NgModel;
  constructor(private quizServise: QuizService) {}
  questions;
  questionNumber: number = 0;
  helpLenght;
  userAnswer: FormGroup;
  allUserAnswer: boolean[] = [];
  trueCounter: number;
  falseCounter: number;
  Score;
  ngOnInit() {
    this.userAnswer = new FormGroup({
      answer: new FormControl()
    });
    const interval = setInterval(res => {
      this.questions = this.quizServise.displayQuestions();
      console.log(this.questions);
      if (this.quizServise.test) {
        clearInterval(interval);
        this.helpLenght = this.questions.length;
      }
    }, 1000);
  }
  onSend() {
    this.allUserAnswer.push(this.userAnswer.get("answer").value);
    this.trueCounter = this.allUserAnswer.filter(Boolean).length;
    this.falseCounter = this.allUserAnswer.length - this.trueCounter;
    this.Score =
      (100 / (this.trueCounter + this.falseCounter)) * this.trueCounter;
    console.log(this.trueCounter, this.falseCounter, this.Score);

    this.questionNumber++;
    this.userAnswer = new FormGroup({
      answer: new FormControl()
    });
  }
}
