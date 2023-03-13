import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  
  qId:any;
  quiz:any;

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _router:Router
  ){}
  
  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qId'];
    // console.log(this.qId);

    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        // console.log(data);
        this.quiz=data;
      },
      (error)=>{
        alert('Error in loading data');
      }
    );
  }


  startQuiz(){
    Swal.fire({
      title: 'Do you want to start the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this._router.navigate(['/start/'+this.qId]);

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
