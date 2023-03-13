import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  //public get questions of quiz
  public getQuestionsOfQuiz(qId:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qId}`);
  }


  public getQuestionsOfQuizForTest(qId:any){
    return this._http.get(`${baseUrl}/question/quiz/${qId}`);
  }


  //add question
  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`,question);
  }

  //delete question
  public deleteQuestion(quesId:any){
    return this._http.delete(`${baseUrl}/question/${quesId}`);
  }

  //eval quiz
  public evalQuiz(questions){
    return this._http.post(`${baseUrl}/question/evalQuiz`,questions);
  }
}
