import { Injectable } from '@angular/core';
import { ListaSpesa } from './lista-spesa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRegister } from '../user/userRegister';

@Injectable({
  providedIn: 'root'
})
export class ListaDellaSpesaService {

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

  add(listaSpesa:ListaSpesa) {
    debugger;
    listaSpesa.user = this.user;
    const headersHttp = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `Bearer ${this.token}`);
    return this.httpClient.post(this.apiUrl+ `/listaSpesa`, listaSpesa , {headers:headersHttp});
  }

  search(listaSpesa:ListaSpesa) {
    debugger;
    listaSpesa.user = this.user;
    const headersHttp = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `Bearer ${this.token}`);
    return this.httpClient.post(this.apiUrl+ `/lista-spesa`, listaSpesa , {headers:headersHttp});
  }

  ordina(id:number) {
    debugger;
    const headersHttp = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `Bearer ${this.token}`);
    return this.httpClient.delete(this.apiUrl+ `/listaSpesa/${id}`,  {headers:headersHttp});
  }
}
