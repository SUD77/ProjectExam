import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private snack: MatSnackBar) {}

  public user = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);

    if (this.user.userName == '' || this.user.userName == null) {
      // alert('User is required !!')
      // Here added MatSnakbar to show pop msgs
      this.snack.open('Username is required !!', '',{
        duration:2000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
    }

    //Put other validations here. for other Fields. 

    //add user funtion from userService
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        //alert('Success');
        swal.fire('Success','User ' + data.userName + ' is Registered','success');
      },
      (error) => {
        console.log(error);
        // alert('Error');
        this.snack.open('Something went wrong','',{
          duration:2000,
          verticalPosition:'top',
          horizontalPosition:'right'
        })
      }
    );
  }
}
