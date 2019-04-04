import { Component, OnInit } from "@angular/core";
import { QuizService } from "../services/quiz.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"]
})
export class QuestionsComponent implements OnInit {
  quizs;
  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit() {
    const interval = setInterval(() => {
      this.quizs = this.quizService.getLangusges();
      console.log(this.quizs);
      if(this.quizs){
        clearInterval(interval)
      }
    }, 1000);
  }

  selectQuiz(quiz: string) {
    this.quizService.getQuiz(quiz.toLowerCase());
    this.router.navigate(["question"]);
  }
}
