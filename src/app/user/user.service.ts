import { Injectable } from '@angular/core';
import { UserRegister } from './userRegister';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:8080/api/v1/home';
  ricette: any;
  user: UserRegister;
  token: any;
  userReturn:any;
  constructor(private httpClient: HttpClient ) {
    this.user = new UserRegister("", "", "", "");
    const a:any = localStorage.getItem("user");
    this.user =JSON.parse(a);
    this.token = JSON.stringify(localStorage.getItem("token")).slice(1,-1);
    debugger;
  }

  getUser() {
    debugger;
    const headersHttp = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `Bearer ${this.token}`);
    return this.httpClient.post(this.apiUrl + '/user', this.user, {headers:headersHttp}).subscribe({
      next:((data: any) => {
        this.user = data;

      }),
      error : (err:any) => {

      }
    });
    }

  getMyuser() {
    this.getUser();
    return this.user;
}
}
