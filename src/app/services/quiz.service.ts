import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  test;
  questions;
  constructor(private http: HttpClient) { }
  getQuiz(name: string) {
    this.test = false;
    this.http.get(environment.link + 'quiz/name' + name).subscribe(res => {
      // console.log(res);
      this.questions = res
      this.test= true;
      // console.log(this.questions);
    })
  }
  displayQuestions(){
    if(this.test){
      return this.questions
    }
  }

}
