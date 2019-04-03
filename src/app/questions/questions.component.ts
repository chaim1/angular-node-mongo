import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  quizs: string[] = ['PHP', 'SQL', 'JQuery', 'JavaScript']
  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit() {
  }

  selectQuiz(quiz: string){
    this.quizService.getQuiz(quiz)
    this.router.navigate(['question'])
  }

}
