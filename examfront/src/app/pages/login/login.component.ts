import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    userName: '',
    password: '',
  };

  constructor(private snack: MatSnackBar, private login: LoginService,private router:Router) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log('login btn clicked');

    if (
      this.loginData.userName.trim() == '' ||
      this.loginData.userName == null
    ) {
      this.snack.open('UserName is Required !!', '', {
        duration: 2000,
      });

      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is Required !!', '', {
        duration: 2000,
      });

      return;
    }

    //Now, if both the above values are fine, then request the sever to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('Success !!');
        console.log(data);

        //login
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);

          //redirect -> if it is Admin then to ADMIN DASHBOARD

          //redirect -> if it is NORMAL then to NORMAL DASHBOARD

          if (this.login.getUserRole() == 'ADMIN') {
            //admin dashboard
            window.location.href = '/admin';
            this.login.loginStatusSubject.next(true);
             
            //this.router.navigate(['admin']);

          } else if (this.login.getUserRole() == 'NormalUser') {
            //user-dashboard
           window.location.href = '/user-dashboard/0';
           this.login.loginStatusSubject.next(true);
            //this.router.navigate(['user-dashboard']);
          } else {
            this.login.logout();
            location.reload();
          }
        });
      },

      (error) => {
        console.log('Error !');
        console.log(error);
        this.snack.open('Invalid Details !! Try Again', '', {
          duration: 2000,
        });
      }
    );
  }
}
