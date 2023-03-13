import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes = [
    {
      qId: 14,
      title: 'English',
      description: 'this is english quiz',
      maxMarks: '10',
      numberOfQuestions: '10',
      active: '',
      category: {
        title: 'Prograamming',
      },
    },
  ];

  constructor(private quiz: QuizService) {}

  ngOnInit(): void {
    this.quiz.getQuizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }

  deleteQuiz(qId: any) {

    //showing confirm button before deleting
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.quiz.deleteQuiz(qId).subscribe(
          (data) => {
            // This will show the remaining quiz on the page, once we delete a particular one.
            this.quizzes = this.quizzes.filter((quiz) => quiz.qId != qId);

            Swal.fire('Success', 'Quiz deleted', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error in deleting quiz', 'error');
          }
        );
      }
    });
  }
}
