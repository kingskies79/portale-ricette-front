import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from '../user/userRegister';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl = 'http://localhost:8080/api/v1/auth/register';
  constructor(private httpClient: HttpClient, private route: Router ) {}
  email: any
  rgister(user: any) {
    return this.httpClient.post(this.apiUrl , user)
  }

  register(user: UserRegister) {
    this.rgister(user).subscribe((res:any) => {
      if(res.token != null) {
       this.saveUser(user, res);
      }else {
        this.route.navigateByUrl('/register');
      }
    })
  }

  saveUser(user: UserRegister, res:any) {
    this.email = {"email" : user.email}
    this.setUserRegister(this.email);
    this.setToken(res.token);
    this.route.navigateByUrl('/dashboard');
  }


  setUserRegister(email: any) {
    localStorage.setItem('user', JSON.stringify(email));
  }
  setToken(token: any) {
    localStorage.setItem('token', token);
  }
}
