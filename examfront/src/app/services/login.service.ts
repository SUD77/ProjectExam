import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  public loginStatusSubject=new Subject<boolean>();
  
  constructor(private http: HttpClient) {}


  //current user - which is loggedIn
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //login user: set token in localStorage
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  //To check if user is locked in or NOt
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');

    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false; // means user is not logged in
    } else {
      return true;
    }
  }

  //logOut function. So, we will remove token from local storage.
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //Setting user details in localStorage of browser
  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }


  public getUser(){
    let userStr=localStorage.getItem('user');

    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }


  //get User role
  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }
}
