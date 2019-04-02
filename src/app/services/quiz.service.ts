import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }
  getQuiz(name: string){
    this.http.get(environment.link+'quiz/name:' + name).subscribe(  res=>{
      console.log(res);
    })
  }
}
