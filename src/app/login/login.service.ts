import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register/register.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiLoginUrl = 'http://localhost:8080/api/v1/auth/login';

  UserRegister: any;
  constructor(private httpClient: HttpClient, private registerService:RegisterService, private route:Router) { }

  getUserRegister() {
      return localStorage.getItem('user')
    }


    login(user: any) {
      this.httpClient.post(this.apiLoginUrl , user).subscribe({
        next:((res: any)  => {
          this.registerService.saveUser(user, res);
          this.route.navigateByUrl('/dashboard');
      }) ,
      error : (err:any) => {
        this.route.navigateByUrl('/login');
      }
      });
    }

    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
}
