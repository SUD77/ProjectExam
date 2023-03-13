import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  

  constructor(private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _category:CategoryService,
    private _router:Router){}
  
  qId=0;
  // quiz:any;
  // categories:any;

  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cId: '',
    },
  };

  categories = [
    {
      cId: 23,
      title: 'programming'
    }
  ];

  ngOnInit(): void {
  
    //THis line is fetching qId, when we click on update button defined in view-quiz-component.html
    this.qId=this._route.snapshot.params['qId']; 
    // alert(this.qId);

    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      } 
    );

    this._category.getCategories().subscribe(
      (data: any) => {
        //load categories
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading categories !!', 'error');
      }
    );
  }


  //update form submit
  public updateData(){
    
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data)=>{
        Swal.fire('Success !!','Quiz Updated','success').then(
          (e)=>{
            this._router.navigate(['/admin/quizzes']);
          }
        );
      },
      (error)=>{
        Swal.fire('Error !!','Error in Updating Quiz','error');
        console.log(error);
      }
    );
  }

}
