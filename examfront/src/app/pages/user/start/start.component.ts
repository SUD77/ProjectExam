import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  
  qId:any;
  questions:any;

  marksGot=0;
  correctAnswers=0;
  attempted=0;

  isSubmit=false;

  timer:any;

  constructor(private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService
    ){}

  ngOnInit(): void {
    this.preventBackButton();
    this.qId=this._route.snapshot.params['qId'];
    console.log(this.qId);
    this.loadQuestions();
  }

  preventBackButton(){
    history.pushState(null,'null',location.href);

    this.locationSt.onPopState(()=>{
      history.pushState(null,'null',location.href);
    });
  }

  loadQuestions(){
    this._question.getQuestionsOfQuizForTest(this.qId).subscribe(
      (data:any)=>{
        this.questions=data;
        this.timer=this.questions.length*2*60;
        // this.questions.forEach((q) => {
        //   q['givenAnswer']='';
        // });

        console.log(this.questions);
        this.startTimer();
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Error in loading question of quiz",'error');
      }
    );
  }

  submitQuiz(){

    Swal.fire({
      title: 'Do you want to submit the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon:'info'
    }).then((e)=>{

      if(e.isConfirmed){
       
        this.evalQuiz();

      }
    });
  }


  //timer 
  startTimer(){
    let t=window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime(){
    let minV=Math.floor(this.timer/60);
    let secV=this.timer-minV*60;

    return `${minV} min: ${secV} seconds`;
  }

  evalQuiz(){

    // CALL TO SERVER TO EVALUATE

    

    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        console.log(data);
        this.marksGot= parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers=data.correctAnswers;
        this.attempted=data.attempted;
        this.isSubmit=true;
      },
      (error)=>{
        console.log(error);
      }
    );

    

    //     this.questions.forEach(q=>{

    //       if(q.givenAnswer==q.answer){
    //         this.correctAnswers++;

    //         let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length;

    //         this.marksGot+=marksSingle;
    //       }

    //       if(q.givenAnswer.trim()!=''){
    //         this.attempted++;
    //       }

          
    //     });

    //     console.log("COrrect answers" + this.correctAnswers);
    //     console.log("Markss got" + this.marksGot);
    //     console.log("attempted " + this.attempted);
  }

  printPage(){
    window.print();
  }
}
