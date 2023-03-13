import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  //get all the quizzes
  public getQuizzes(){
    return this.http.get(`${baseUrl}/quiz/`)
  }

  //add-quiz
  public addQuiz(quiz:any){
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  //delete quiz
  public deleteQuiz(qId:any){
    return this.http.delete(`${baseUrl}/quiz/${qId}`);
  }

  //get single quiz
  public getQuiz(qId:any){
    return this.http.get(`${baseUrl}/quiz/${qId}`);
  }


  //update quiz
  public updateQuiz(quiz:any){
    return this.http.put(`${baseUrl}/quiz/update`,quiz);
  }

  //get quizes of category
  public getQuizesOfCategory(cId:any){
    return this.http.get(`${baseUrl}/quiz/category/${cId}`);
  }


  //get active quizzes
  public getActiveQuizzes(){
    return this.http.get(`${baseUrl}/quiz/active`);
  }

  //get active quizzes of category
  public getActiveQuizzesOfCategory(cId){
    return this.http.get(`${baseUrl}/quiz/category/active/${cId}`);
  }
}
