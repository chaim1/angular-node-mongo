import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class QuizService {
  test;
  questions;
  Langusge;

  constructor(private http: HttpClient) {}
  getQuiz(name: string) {
    this.test = false;
    this.http.get(environment.link + "quiz/name" + name).subscribe(res => {
      // console.log(res);
      this.questions = res;
      this.test = true;
      // console.log(this.questions);
    });
  }
  displayQuestions() {
    if (this.test) {
      return this.questions;
    }
  }
  addQuestion(questionData) {
    this.http.post(environment.link + "quiz", questionData).subscribe(
      res => {
        console.log(res);
      }
    );
  }
  getLangusges(){
    if(!this.Langusge){
      this.http.get(environment.link+'Langusge').subscribe(res=>{
        this.Langusge = res;
      })
    }else{
      return this.Langusge
    }
  }
  addLangusge(name){

    this.http.post(environment.link+'Langusge',name).subscribe(res=>{
      console.log(res);
    })
  }
}
