import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ricette } from '../ricette/ricette';
import { UserRegister } from '../user/userRegister';

@Injectable({
  providedIn: 'root'
})
export class RicetteService {

  apiUrl = 'http://localhost:8080/api/v1/home';
  ricette: any;
  user: UserRegister;
  token: any;
  constructor(private httpClient: HttpClient ) {
    this.user = new UserRegister("", "", "", "");
    const a:any = localStorage.getItem("user");
    this.user =JSON.parse(a);
    this.token = JSON.stringify(localStorage.getItem("token")).slice(1,-1);
    debugger;
  }

   search() {
    debugger;
    const headersHttp = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `Bearer ${this.token}`);
    return this.httpClient.post(this.apiUrl + '/mie-ricette', this.user, {headers:headersHttp});
  }

  searchAll() {
    debugger;
    const headersHttp = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `Bearer ${this.token}`);
    return this.httpClient.get(this.apiUrl + '/ricette',  {headers:headersHttp});
  }

  delete(id:number) {
    debugger;
    const headersHttp = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `Bearer ${this.token}`);
    return this.httpClient.delete(this.apiUrl+ `/ricetta/${id}` , {headers:headersHttp});
  }

  update(ricetta:Ricette) {
    debugger;
    ricetta.user=this.user;
    const headersHttp = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `Bearer ${this.token}`);
    return this.httpClient.post(this.apiUrl+ `/ricetta/ ${ricetta.id}`, ricetta , {headers:headersHttp});
  }

  save(ricetta:Ricette) {
    debugger;
    ricetta.user = this.user;
    const headersHttp = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `Bearer ${this.token}`);
    return this.httpClient.post(this.apiUrl+ `/ricetta`, ricetta , {headers:headersHttp});
  }

}
