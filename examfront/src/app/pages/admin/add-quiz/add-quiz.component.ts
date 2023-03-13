import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  
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


  constructor(
    private _quiz: QuizService,
    private _snack: MatSnackBar,
    private _category: CategoryService
  ) {}


  ngOnInit(): void {
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

  //to add quiz
  addQuiz() {

    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this._snack.open('Title required !!', '', {
        duration: 2000,
      });

      return;
    }

    this._quiz.addQuiz(this.quiz).subscribe(
      (data: any) => {
        // below, we are making fields as empty, as after sumitting, fields should get empty.
        Swal.fire('Success !!', 'Quiz is added successfully', 'success');
        this.quiz = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: {
            cId: '',
          },
        };
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Server error !!', 'error');
      }
    );
  }

}
