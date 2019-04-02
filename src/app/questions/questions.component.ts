import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  quizs: string[] = ['PHP', 'SQL', 'JQuery', 'JavaScript']
  constructor(private quizService: QuizService) { }

  ngOnInit() {
  }

  selectQuiz(quiz: string){
    this.quizService.getQuiz(quiz)
  }

}
